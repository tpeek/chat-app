import { useState, useEffect } from 'react';
import moment from 'moment';

import { db } from './firebase';

export default (path, orderBy) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    return db
      .collection(path)
      .orderBy(orderBy)
      .onSnapshot(snapshot => {
        const docs = [];
        snapshot.forEach(doc => {
          docs.push({
            ...doc.data(),
            id: doc.id,
            ...(doc.data().createdAt ? { createdAt: moment(doc.data().createdAt.toDate()) } : {}),
          });
        });
        setDocs(docs);
      });
  }, []);
  return docs;
};
