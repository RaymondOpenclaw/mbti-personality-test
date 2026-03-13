'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { TestSession, Answer, Question } from '@/types';
import { getQuestions as getQuestionsData } from '@/data/mbtiTypes';

const STORAGE_KEY = 'mbti_test_session';

export function useTestSession() {
  const [session, setSession] = useState<TestSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Mark as client-side mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load saved session on mount (client-side only)
  useEffect(() => {
    if (!isClient) return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && parsed.version && Array.isArray(parsed.answers)) {
          setSession(parsed);
          setQuestions(getQuestionsData(parsed.version));
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [isClient]);

  // Save session when it changes (client-side only)
  useEffect(() => {
    if (!isClient) return;
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
  }, [session, isClient]);

  const startTest = useCallback((version: 'quick' | 'standard' | 'professional') => {
    const newSession: TestSession = {
      id: `session_${Date.now()}`,
      version,
      status: 'in_progress',
      currentQuestion: 0,
      answers: [],
      startedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    setSession(newSession);
    setQuestions(getQuestionsData(version));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));

    return newSession;
  }, []);

  const answerQuestion = useCallback((questionId: number, value: number) => {
    setSession(prev => {
      if (!prev) return null;

      const newAnswer: Answer = { questionId, value };
      const existingIndex = prev.answers.findIndex(a => a.questionId === questionId);

      let newAnswers: Answer[];
      if (existingIndex >= 0) {
        newAnswers = [...prev.answers];
        newAnswers[existingIndex] = newAnswer;
      } else {
        newAnswers = [...prev.answers, newAnswer];
      }

      return {
        ...prev,
        answers: newAnswers,
        currentQuestion: prev.currentQuestion + 1
      };
    });
  }, []);

  const goBack = useCallback(() => {
    setSession(prev => {
      if (!prev || prev.currentQuestion <= 0) return prev;
      return {
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      };
    });
  }, []);

  const completeTest = useCallback(() => {
    setSession(prev => {
      if (!prev) return null;
      const updated = {
        ...prev,
        status: 'completed' as const,
        finishedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearSession = useCallback(() => {
    setSession(null);
    setQuestions([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isLoading = !isClient;
  const currentQuestion = session?.currentQuestion || 0;
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;
  const isComplete = session?.status === 'completed';

  return useMemo(() => ({
    session,
    questions,
    isLoading,
    currentQuestion,
    totalQuestions,
    progress,
    isComplete,
    startTest,
    answerQuestion,
    goBack,
    completeTest,
    clearSession
  }), [session, questions, isLoading, currentQuestion, totalQuestions, progress, isComplete, startTest, answerQuestion, goBack, completeTest, clearSession]);
}
