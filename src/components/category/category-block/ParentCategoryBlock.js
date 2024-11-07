import Link from 'next/link';
import Image from "../../../image";
import { DEFAULT_CATEGORY_IMG_URL } from "../../../constants/urls";
import { isEmpty } from 'lodash';
import { useState } from 'react';

const ParentCategoryBlock = ({ category }) => {
    
    if (!category?.image) {
        return null;
    }

    return (
        <Link href={`/category/${category?.slug}`}>
            <div className="relative">
                 <div className="bg-white p-2 relative overflow-hidden lg:mx-6">
                    {/* Изображение категории */}
                    <Image
                        className={""}
                        height={10}
                        width={10}
                        style={{ objectPosition: 'center center', objectFit: 'cover' }}
                        layout="fill"
                        containerClassNames="h-48 w-48"
                        loading="lazy"
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                        sourceUrl={category?.image?.sourceUrl ?? ''}
                        defaultImgUrl={DEFAULT_CATEGORY_IMG_URL}
                        altText={category?.image?.altText ?? category.slug}
                        alt={category?.name}
                        placeholder="blur"
                        blurDataURL={category?.image?.sourceUrl ?? ''}
                        quality={40}
                     




                        
                    />
                    {/* Название категории */}
                    <h3 className="text-text_grey pt-3">
                        {category?.name}
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export default ParentCategoryBlock;
