'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import Image from 'next/image';
import AnimatedText from '@/components/componentspage/AnimatedText';
import { BlogType } from '@/types/blog';
import Link from 'next/link';

interface PaginationComponentProps {
  items: BlogType[];
  itemsPerPage: number;
}

export default function PaginationComponent({
  items,
  itemsPerPage
}: PaginationComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {getCurrentPageItems().map((item, index) => (
          <AnimatedText key={index} delay={index * 0.1}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="relative">
                  <Link href={`/blog/${item.id}`}>
                    <Image
                      src={item.thumbnail.url}
                      alt={item.title}
                      width={397}
                      height={250}
                      className="h-[200px] w-full object-cover md:h-[250px]"
                    />
                  </Link>
                  <Badge className="absolute left-4 top-4 bg-blue-500 text-white">
                    {item.tags[0].name}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3
                    className="mb-2 truncate text-lg font-medium md:text-xl"
                    style={{
                      fontFamily: '"Noto Sans JP", sans-serif',
                      letterSpacing: '1.6px'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="truncate text-sm text-gray-700 md:text-base"
                    style={{
                      fontFamily: '"Noto Sans JP", sans-serif',
                      letterSpacing: '1.6px'
                    }}
                  >
                    {item.description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      className="truncate text-sm text-[#F4951F] hover:underline md:text-base"
                      style={{
                        fontFamily: '"Noto Sans JP", sans-serif',
                        letterSpacing: '1.6px'
                      }}
                    >
                      {item.link}
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </AnimatedText>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
