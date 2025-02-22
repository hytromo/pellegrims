import { NextPage } from 'next';
import { trpc } from '@pellegrims/goldgetters/data-access';

export const Locations: NextPage = () => {
  const { data } = trpc.useQuery(['locations']);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>Locations</h1>
      <ul>
        {data.list.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Locations;
