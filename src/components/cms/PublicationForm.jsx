import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PublicationForm({ publication, onSave, onCancel }) {
  const [formData, setFormData] = useState(publication || {
    title: '',
    authors: '',
    type: 'journal',
    venue: '',
    year: new Date().getFullYear(),
    abstract: '',
    pdf_url: '',
    doi: '',
    status: '',
    order: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-light">
          {publication ? 'Edit Publication' : 'New Publication'}
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
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Authors</Label>
            <Input
              value={formData.authors}
              onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
              placeholder="e.g., J. Smith, A. Johnson"
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="working_paper">Working Paper</SelectItem>
                  <SelectItem value="journal">Journal Article</SelectItem>
                  <SelectItem value="conference">Conference Paper</SelectItem>
                  <SelectItem value="book_chapter">Book Chapter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Venue (Journal/Conference name)</Label>
            <Input
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              placeholder="e.g., Operations Research, INFORMS"
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Input
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              placeholder="e.g., Under Review, Accepted, Published"
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Abstract</Label>
            <Textarea
              value={formData.abstract}
              onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
              rows={6}
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>PDF URL</Label>
              <Input
                type="url"
                value={formData.pdf_url}
                onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                placeholder="https://"
                className="border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label>DOI</Label>
              <Input
                value={formData.doi}
                onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                placeholder="https://doi.org/..."
                className="border-gray-300 dark:border-gray-600"
              />
            </div>
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
              Save Publication
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}