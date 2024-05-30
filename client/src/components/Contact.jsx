import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
        <div className="md:flex">
        <div className='pt-4 pb-4'>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Seller Information</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-bold">First Name : </span> {landlord.firstname}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Last Name : </span> {landlord.lastname}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Email : </span> {landlord.email}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Phone Number : </span> {landlord.phonenumber}
            </p>
          </div>
        </div>
      </div>      
          <p>
            Contact <span className='font-semibold'>{landlord.firstname}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-blue-500 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )}
    </>
  );
}
