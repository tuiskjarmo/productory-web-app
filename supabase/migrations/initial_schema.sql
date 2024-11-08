-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create topics table
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RFP requests table
CREATE TABLE rfp_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topics UUID[] NOT NULL,
    contact_email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
    ('AI Fundamentals', 'Core concepts and foundations of artificial intelligence'),
    ('AI Applications', 'Practical applications and use cases of AI'),
    ('AI in Business', 'Business applications and implementation strategies');

-- Insert sample topics
WITH cat AS (SELECT * FROM categories)
INSERT INTO topics (category_id, name, description, duration)
SELECT 
    c.id,
    t.name,
    t.description,
    t.duration
FROM cat c
CROSS JOIN LATERAL (
    VALUES 
        -- AI Fundamentals topics
        ('Introduction to AI', 'Basic concepts, history, and current state of AI', '4 hours'),
        ('Machine Learning Fundamentals', 'Core concepts of machine learning and its applications', '8 hours'),
        ('Deep Learning Essentials', 'Neural networks and deep learning foundations', '12 hours')
) t(name, description, duration)
WHERE c.name = 'AI Fundamentals'
UNION ALL
SELECT 
    c.id,
    t.name,
    t.description,
    t.duration
FROM cat c
CROSS JOIN LATERAL (
    VALUES 
        ('Natural Language Processing', 'Text analysis, generation, and language understanding', '16 hours'),
        ('Computer Vision', 'Image recognition, object detection, and visual AI', '16 hours'),
        ('Reinforcement Learning', 'Decision making and autonomous systems', '12 hours')
) t(name, description, duration)
WHERE c.name = 'AI Applications'
UNION ALL
SELECT 
    c.id,
    t.name,
    t.description,
    t.duration
FROM cat c
CROSS JOIN LATERAL (
    VALUES 
        ('AI Strategy', 'Developing and implementing AI initiatives', '8 hours'),
        ('AI Ethics and Governance', 'Ethical considerations and responsible AI practices', '6 hours'),
        ('Digital Transformation with AI', 'Organizational change and AI adoption', '8 hours')
) t(name, description, duration)
WHERE c.name = 'AI in Business';