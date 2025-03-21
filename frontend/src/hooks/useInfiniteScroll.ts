// lib
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

export const useInfiniteScroll = <T>(fetchNextPage: UseInfiniteQueryResult<T, any>['fetchNextPage']) => {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    return { ref };
};

