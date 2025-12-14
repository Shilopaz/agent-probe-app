-- Add image_url column to messages table
ALTER TABLE public.messages 
ADD COLUMN image_url TEXT;

-- Create storage bucket for chat images
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-images', 'chat-images', true);

-- Allow public read access to chat images
CREATE POLICY "Public read access for chat images"
ON storage.objects FOR SELECT
USING (bucket_id = 'chat-images');

-- Allow anyone to upload chat images
CREATE POLICY "Anyone can upload chat images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'chat-images');