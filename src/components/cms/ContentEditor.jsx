import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Loader2, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ContentEditor({ content, onSave, onCancel }) {
  const [formData, setFormData] = useState(content || {
    key: '',
    title: '',
    body: '',
    image_url: '',
    metadata: {}
  });
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file) => {
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData(prev => ({ ...prev, image_url: file_url }));
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="border-neutral-200">
      <CardHeader>
        <CardTitle className="text-xl font-light">
          {content ? 'Edit Content' : 'New Content'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Key (Identifier) *</Label>
            <Input
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              required
              placeholder="e.g., about, hero, contact"
              disabled={!!content}
              className="border-neutral-300"
            />
            <p className="text-xs text-neutral-500">Unique identifier for this content</p>
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label>Body</Label>
            <Textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              rows={6}
              className="border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label>Image</Label>
            {formData.image_url ? (
              <div className="relative">
                <img src={formData.image_url} alt="Preview" className="w-full h-48 object-cover rounded-sm" />
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => setFormData({ ...formData, image_url: '' })}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-neutral-300 rounded-sm p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="content-image"
                  disabled={uploading}
                />
                <label htmlFor="content-image" className="cursor-pointer">
                  {uploading ? (
                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-neutral-400" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
                      <p className="text-sm text-neutral-600">Click to upload</p>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-neutral-900 hover:bg-neutral-800">
              Save Content
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}