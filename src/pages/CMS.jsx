import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import ContentEditor from '../components/cms/ContentEditor';
import PublicationForm from '../components/cms/PublicationForm';
import CourseForm from '../components/cms/CourseForm';
import StudentForm from '../components/cms/StudentForm';
import ResearchAreaForm from '../components/cms/ResearchAreaForm';
import { createPageUrl } from '../utils';
import { Link } from 'react-router-dom';

export default function CMS() {
  const [activeTab, setActiveTab] = useState('content');
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();

  const { data: contents = [] } = useQuery({
    queryKey: ['contents'],
    queryFn: () => base44.entities.Content.list()
  });

  const { data: publications = [] } = useQuery({
    queryKey: ['publications'],
    queryFn: () => base44.entities.Publication.list()
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: () => base44.entities.Course.list()
  });

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: () => base44.entities.Student.list()
  });

  const { data: researchAreas = [] } = useQuery({
    queryKey: ['researchAreas'],
    queryFn: () => base44.entities.ResearchArea.list()
  });

  const createMutation = (entityName, queryKey) => useMutation({
    mutationFn: (data) => {
      if (editingItem) {
        return base44.entities[entityName].update(editingItem.id, data);
      }
      return base44.entities[entityName].create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setShowForm(false);
      setEditingItem(null);
    }
  });

  const deleteMutation = (entityName, queryKey) => useMutation({
    mutationFn: (id) => base44.entities[entityName].delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  });

  const contentMutation = createMutation('Content', 'contents');
  const publicationMutation = createMutation('Publication', 'publications');
  const courseMutation = createMutation('Course', 'courses');
  const studentMutation = createMutation('Student', 'students');
  const researchAreaMutation = createMutation('ResearchArea', 'researchAreas');

  const deleteContentMutation = deleteMutation('Content', 'contents');
  const deletePublicationMutation = deleteMutation('Publication', 'publications');
  const deleteCourseMutation = deleteMutation('Course', 'courses');
  const deleteStudentMutation = deleteMutation('Student', 'students');
  const deleteResearchAreaMutation = deleteMutation('ResearchArea', 'researchAreas');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Content Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your academic website content
            </p>
          </div>
          <Link to={createPageUrl('Home')}>
            <Button variant="outline" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              View Site
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            <TabsList className="inline-flex w-max md:w-auto">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="research">Research Areas</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="teaching">Teaching</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>
          </div>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light text-gray-900 dark:text-white">Site Content</h2>
              <Button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 gap-2"
              >
                <Plus className="w-4 h-4" />
                New Content
              </Button>
            </div>

            {showForm && (
              <ContentEditor
                content={editingItem}
                onSave={(data) => contentMutation.mutate(data)}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            <div className="space-y-4">
              {contents.map((content) => (
                <Card key={content.id} className="border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-medium">
                            {content.key}
                          </span>
                          {content.title && (
                            <h3 className="font-medium text-lg dark:text-white">{content.title}</h3>
                          )}
                        </div>
                        {content.body && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                            {content.body}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(content);
                            setShowForm(true);
                          }}
                        >
                          <Pencil className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm('Delete this content?')) {
                              deleteContentMutation.mutate(content.id);
                            }
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Research Areas Tab */}
          <TabsContent value="research" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light text-gray-900 dark:text-white">Research Areas</h2>
              <Button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 gap-2"
              >
                <Plus className="w-4 h-4" />
                New Area
              </Button>
            </div>

            {showForm && (
              <ResearchAreaForm
                area={editingItem}
                onSave={(data) => researchAreaMutation.mutate(data)}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {researchAreas.map((area) => (
                <Card key={area.id} className="border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg dark:text-white mb-2">{area.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                      {area.description}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingItem(area);
                          setShowForm(true);
                        }}
                      >
                        <Pencil className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm('Delete this research area?')) {
                            deleteResearchAreaMutation.mutate(area.id);
                          }
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Publications Tab */}
          <TabsContent value="publications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light text-gray-900 dark:text-white">Publications</h2>
              <Button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 gap-2"
              >
                <Plus className="w-4 h-4" />
                New Publication
              </Button>
            </div>

            {showForm && (
              <PublicationForm
                publication={editingItem}
                onSave={(data) => publicationMutation.mutate(data)}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            <div className="space-y-4">
              {publications.map((pub) => (
                <Card key={pub.id} className="border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg dark:text-white mb-2">{pub.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{pub.authors}</p>
                        <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-500">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{pub.type}</span>
                          {pub.year && <span>{pub.year}</span>}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(pub);
                            setShowForm(true);
                          }}
                        >
                          <Pencil className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm('Delete this publication?')) {
                              deletePublicationMutation.mutate(pub.id);
                            }
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Teaching Tab */}
          <TabsContent value="teaching" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light text-gray-900 dark:text-white">Courses</h2>
              <Button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 gap-2"
              >
                <Plus className="w-4 h-4" />
                New Course
              </Button>
            </div>

            {showForm && (
              <CourseForm
                course={editingItem}
                onSave={(data) => courseMutation.mutate(data)}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id} className="border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg dark:text-white mb-1">
                          {course.name} {course.code && `(${course.code})`}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{course.institution}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(course);
                            setShowForm(true);
                          }}
                        >
                          <Pencil className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm('Delete this course?')) {
                              deleteCourseMutation.mutate(course.id);
                            }
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light text-gray-900 dark:text-white">Students</h2>
              <Button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 gap-2"
              >
                <Plus className="w-4 h-4" />
                New Student
              </Button>
            </div>

            {showForm && (
              <StudentForm
                student={editingItem}
                onSave={(data) => studentMutation.mutate(data)}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {students.map((student) => (
                <Card key={student.id} className="border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-lg dark:text-white">{student.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {student.degree} • {student.status}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(student);
                            setShowForm(true);
                          }}
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm('Delete this student?')) {
                              deleteStudentMutation.mutate(student.id);
                            }
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}