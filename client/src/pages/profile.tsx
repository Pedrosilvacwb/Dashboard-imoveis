import { useGetIdentity, useOne } from '@pankod/refine-core';

import { Profile } from 'components';
const MyProfile = () => {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.userId,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Ops, Algo deu errado...</div>;

  return (
    <Profile
      type="Meu"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default MyProfile;
