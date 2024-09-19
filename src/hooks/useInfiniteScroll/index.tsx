import { useCallback, useRef, useState } from "react";

import { ICategory } from "@services/category/types";

import { IAccount, ITransaction } from "@utils/interfaces";

import { useNetworkStatus } from "@contexts/NetworkStatusContext";

type ItemType = ITransaction | ICategory | IAccount;

const useInfiniteScroll = (service: Function) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [existingItemIds, setExistingItemsIds] = useState<Set<string>>(
    new Set()
  );

  // Get network status.
  const { isOnline } = useNetworkStatus();

  // Create observer ref.
  const observerRef = useRef<IntersectionObserver>();

  // Create observer callback.
  const observerCb: IntersectionObserverCallback = useCallback(
    async (entries) => {
      if (!entries[0].isIntersecting) return;

      setIsLoading(true);

      if (isOnline) {
        // Get more items.
        const {
          items: newItems,
          totalPageCount,
          ok,
        } = await service(page).finally(() => setIsLoading(false));

        if (!ok) return;

        if (newItems.length) {
          setItems((prev) => {
            // Remove any of the new items if already exists.
            let uniqueItems = newItems.filter(
              (itm: any) => !existingItemIds.has(itm._id)
            );

            // Add the new items to existing.
            let newIds = uniqueItems.map((itm: any) => itm._id);

            setExistingItemsIds((prev) => {
              newIds.forEach((id: string) => prev.add(id));
              return prev;
            });

            return [...prev, ...uniqueItems];
          });
        }

        if (totalPageCount > 1) {
          if (totalPageCount === page) {
            setIsLastPage(true);
          }

          setPage((prev) => prev + 1);
        } else {
          setIsLastPage(true);
        }
      } else {
        setIsLoading(false);
      }
    },
    [page, service, existingItemIds, isOnline]
  );

  // Target ref.
  const targetRefCallback = useCallback(
    (target: Element) => {
      if (isLoading) return;

      // Disconnect from previous observer.
      if (observerRef.current) observerRef.current.disconnect();

      // Create new observer.
      observerRef.current = new IntersectionObserver(observerCb, {
        threshold: 1.0,
      });

      // Observe target.
      if (target) observerRef.current.observe(target);
    },
    [isLoading, observerCb]
  );

  return {
    isLoading,
    targetRefCallback,
    items,
    isLastPage,
  };
};

export default useInfiniteScroll;
