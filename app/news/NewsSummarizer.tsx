'use client'

import React, {useState} from 'react';

export default function NewsSummarizer({
                                           backendUrl = 'http://localhost:8080/news/summary',
                                       }) {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const summarize = async () => {
        setLoading(true);
        setError('');
        setSummary('');

        try {
            const response = await fetch(backendUrl, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();
            setSummary(text);

        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown error';
            setError(`오류가 발생했습니다: ${msg}`);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6">
                    <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                        </svg>
                        <h2 className="text-2xl font-bold text-white">뉴스 요약</h2>
                    </div>
                </div>

                <div className="p-6">
                    <div className="border-t pt-6">

                        <button
                            disabled={loading}
                            onClick={summarize}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                            {loading ? '요약 생성 중...' : '요약하기'}
                        </button>

                        {loading && (
                            <div className="flex items-center justify-center gap-3 py-8">
                                <svg className="w-6 h-6 animate-spin text-indigo-600" fill="none"
                                     viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                            stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042
                                          1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                                <span className="text-gray-600">요약 생성 중...</span>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                                <svg className="w-5 h-5 text-red-600" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0
                                          9 9 0 0118 0z"/>
                                </svg>
                                <span className="text-red-700">{error}</span>
                            </div>
                        )}

                        {summary && !loading && (
                            <div className="bg-indigo-50 rounded-lg p-6 mt-6">
                                <h3 className="text-lg font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                                    <span>📝</span>
                                    요약 결과
                                </h3>
                                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                    {summary}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
