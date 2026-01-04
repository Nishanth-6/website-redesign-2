import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Loader2, X, FileText } from 'lucide-react';
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
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const isPdf = (url) => url?.toLowerCase().endsWith('.pdf');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0 pb-6 border-b border-gray-100 dark:border-gray-800 mb-6">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          {content ? 'Edit Content' : 'Create New Content'}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Key (ID) <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                required
                placeholder="e.g. cv, about, hero"
                disabled={!!content}
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">Unique identifier used to find this content in the code.</p>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Title
              </Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Content Title"
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Body Text
            </Label>
            <Textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              rows={8}
              placeholder="Enter main content here..."
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 leading-relaxed"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Attachment (Image or PDF)
            </Label>
            
            {formData.image_url ? (
              <div className="relative group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 w-full md:w-1/2">
                {isPdf(formData.image_url) ? (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                    <FileText className="w-12 h-12 mb-2 text-red-500" />
                    <span className="font-medium text-sm">PDF Document Uploaded</span>
                    <a href={formData.image_url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-1">
                      View File
                    </a>
                  </div>
                ) : (
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="w-full h-48 object-cover" 
                  />
                )}
                
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setFormData({ ...formData, image_url: '' })}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors rounded-xl p-10 text-center w-full md:w-1/2">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="content-file"
                  disabled={uploading}
                />
                <label htmlFor="content-file" className="cursor-pointer flex flex-col items-center">
                  {uploading ? (
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                  ) : (
                    <>
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                        <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="font-medium text-gray-900 dark:text-gray-200">Click to upload</p>
                      <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or PDF</p>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="px-6 rounded-lg border-gray-200 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
            >
              Save Content
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}