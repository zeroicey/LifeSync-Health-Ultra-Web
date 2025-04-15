"use client";

import { useLocale } from "next-intl";
import { TestPage } from "@/components/evaluate/TestPage";
import { useParams } from "next/navigation";
import React from "react";

interface TestDetailPageProps {
  params: {
    testId: string;
  };
}

export default function TestDetailPage() {
  const locale = useLocale();
  const params = useParams();
  const testId = params.testId as string;

  return (
    <main className="min-h-screen py-8">
      <TestPage testId={testId} locale={locale} />
    </main>
  );
}
