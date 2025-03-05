import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { addSurvey, updateSurvey, setExpirationDate } from '../store/slices/surveySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, Eye } from 'lucide-react';
import { RootState } from '../store';

const questionSchema = z.object({
  id: z.string(),
  type: z.enum(['multiple_choice', 'text', 'rating']),
  text: z.string().min(1, 'Question text is required'),
  options: z.array(z.string()).optional(),
});

const surveySchema = z.object({
  title: z.string().min(1, 'Survey title is required'),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
  expirationDate: z.string().optional(),
});

type SurveyFormData = z.infer<typeof surveySchema>;

const SurveyBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingSurvey = useSelector((state: RootState) =>
    state.survey.surveys.find(s => s.id === id)
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: existingSurvey || {
      title: '',
      questions: [{ id: Date.now().toString(), type: 'text', text: '' }],
      expirationDate: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  useEffect(() => {
    if (existingSurvey) {
      reset(existingSurvey);
    }
  }, [existingSurvey, reset]);

  const onSubmit = (data: SurveyFormData) => {
    if (id) {
      dispatch(updateSurvey({ id, ...data }));
      if (data.expirationDate) {
        dispatch(setExpirationDate({ id, date: data.expirationDate }));
      }
    } else {
      const newId = Date.now().toString();
      dispatch(addSurvey({ id: newId, ...data }));
    }
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-2xl font-semibold mb-6">
        {id ? 'Edit Survey' : 'Create New Survey'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Survey Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className="w-full px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="expirationDate" className="block mb-1 font-medium">
            Expiration Date (optional)
          </label>
          <input
            type="date"
            id="expirationDate"
            {...register('expirationDate')}
            className="w-full px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Questions</h2>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xs"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Question {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-800"
                  disabled={fields.length === 1}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="space-y-2">
                <select
                  {...register(`questions.${index}.type`)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="text">Text</option>
                  <option value="multiple_choice">Multiple Choice</option>
                  <option value="rating">Rating</option>
                </select>
                <input
                  type="text"
                  {...register(`questions.${index}.text`)}
                  placeholder="Enter question text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.questions?.[index]?.text && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.questions[index]?.text?.message}
                  </p>
                )}
                {watch(`questions.${index}.type`) === 'multiple_choice' && (
                  <div className="space-y-2">
                    {[0, 1, 2, 3].map((optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        {...register(`questions.${index}.options.${optionIndex}`)}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="w-full px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600"
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {errors.questions && (
            <p className="mt-1 text-sm text-red-600">{errors.questions.message}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => append({ id: Date.now().toString(), type: 'text', text: '' })}
            className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-300 flex items-center"
          >
            <Plus className="mr-2" size={18} />
            Add Question
          </button>
          <button
            type="submit"
            className="bg-gray-800 dark:bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 flex items-center"
          >
            <Eye className="mr-2" size={18} />
            {id ? 'Update Survey' : 'Create Survey'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SurveyBuilder;