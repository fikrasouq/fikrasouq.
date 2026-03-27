"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IdeaCard } from "@/components/ideas/idea-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ideas } from "@/lib/data";
import { readFavorites } from "@/lib/mock-storage";
import { Idea } from "@/types";

export function FavoritesBoard() {
  const [favoriteIdeas, setFavoriteIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const favoriteSlugs = readFavorites();
    setFavoriteIdeas(ideas.filter((idea) => favoriteSlugs.includes(idea.slug)));
  }, []);

  if (!favoriteIdeas.length) {
    return (
      <EmptyState
        title="لا توجد أفكار محفوظة بعد"
        description="استخدم زر إضافة إلى المفضلة داخل أي فكرة، وستظهر هنا مباشرة عند العودة لهذه الصفحة."
        action={
          <Link href="/ideas" className="premium-button motion-button">
            استعرض الأفكار
          </Link>
        }
      />
    );
  }

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {favoriteIdeas.map((idea) => (
        <IdeaCard key={idea.slug} idea={idea} />
      ))}
    </section>
  );
}
