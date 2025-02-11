import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

export default function withAuth(Component) {
  return (props) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
      const loadSession = async () => {
        const session = await getSession();
        setSession(session);
      };
      loadSession();
    }, []);

    if (!session) {
      return <p>Loading...</p>;
    }

    return <Component {...props} />;
  };
}
