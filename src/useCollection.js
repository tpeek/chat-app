import { useState, useEffect } from 'react';
import moment from 'moment';

import { db } from './firebase';

export default (path, orderBy, where = []) => {
  const [docs, setDocs] = useState([]);
  const [queryField, queryOperator, queryValue] = where;

  useEffect(() => {
    let collection = db.collection(path);

    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }

    if (queryField) {
      collection = collection.where(queryField, queryOperator, queryValue);
    }

    return collection.onSnapshot(snapshot => {
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
  }, [path, orderBy, queryField, queryOperator, queryValue]);
  return docs;
};
