import { useEffect, useRef } from "react";
import isInViewport from "@/utils/isInViewport";

const LoadMoreElement = ({
  threshold = 1.0,
  loadMore,
}: {
  threshold?: number;
  loadMore: () => void;
}) => {
  const viewportObserver = useRef<IntersectionObserver | null>(null);
  const showMoreRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    viewportObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check element is in viewport
            if (showMoreRef?.current && isInViewport(showMoreRef.current)) {
              loadMore();
            }
          }
        });
      },
      {
        threshold,
      },
    );

    if (showMoreRef?.current) {
      viewportObserver.current!.observe(showMoreRef.current);
    }

    // Important for performance! Clear old timeout when scroll position was changed
    return () => {
      viewportObserver.current?.disconnect();
    };
  }, [loadMore]);

  return (
    <div ref={showMoreRef} className="relative -z-10 h-[1px] w-[1px] opacity-0">
      <span className="sr-only">Show more</span>
    </div>
  );
};

export default LoadMoreElement;
