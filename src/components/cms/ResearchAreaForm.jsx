import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Loader2, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ResearchAreaForm({ area, onSave, onCancel }) {
  const [formData, setFormData] = useState(area || {
    title: '',
    description: '',
    image_url: '',
    order: 0
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
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-light">
          {area ? 'Edit Research Area' : 'New Research Area'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g., Self-adapting Approximations"
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={6}
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Image</Label>
            {formData.image_url ? (
              <div className="relative">
                <img src={formData.image_url} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
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
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="area-image"
                  disabled={uploading}
                />
                <label htmlFor="area-image" className="cursor-pointer">
                  {uploading ? (
                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-gray-400" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload</p>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Display Order</Label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Research Area
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}