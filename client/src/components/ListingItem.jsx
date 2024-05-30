import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn, MdFavoriteBorder, MdFavorite } from 'react-icons/md';

export default function ListingItem({ listing }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    // Additional logic to handle liking/unliking action (e.g., API call)
  };

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://assets-news.housing.com/news/wp-content/uploads/2022/01/10145854/most-beautiful-houses2.png'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold'>
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}{' '}
            Rs
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex items-center gap-4'>
            <div className='font-bold text-xs'>
              <p>{listing.bedrooms}BHK</p>
            </div>
            <div className='ml-auto cursor-pointer' onClick={toggleLike}>
              {liked ? (
                <MdFavorite className='h-6 w-6 text-red-500' />
              ) : (
                <MdFavoriteBorder className='h-6 w-6 text-gray-400 hover:text-red-500' />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
