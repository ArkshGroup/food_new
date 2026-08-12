"use client";

import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { updateViewMutation } from "../../_mutation/update-blog-view";

const IncrementView = ({ slug }: { slug: string }) => {
  const { execute } = useAction(updateViewMutation);
  const [alreadyViewed, setAlreadyViewed] = useState(true);

  useEffect(() => {
    const isViewed = document.cookie
      .split("; ")
      .some((cookie) => cookie === `blog-viewed-${slug}=true`);
    setAlreadyViewed(isViewed);
  }, [slug]);

  useEffect(() => {
    if (alreadyViewed) return;
    const timer = setTimeout(() => {
      execute({ slug });
      document.cookie = `blog-viewed-${slug}=true; max-age=${
        60 * 60 * 24
      }; path=/`;
    }, 5000);

    return () => clearTimeout(timer);
  }, [alreadyViewed, slug, execute]);

  return null;
};

export default IncrementView;
