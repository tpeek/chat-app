import { useState, useEffect } from 'react';

import { db } from './firebase';

const cache = {};
const pendingCache = {};

const useDocWithCache = path => {
  const [doc, setDoc] = useState(cache[path]);

  useEffect(() => {
    if (!doc) {
      let stillMounted = true;
      const promise = pendingCache[path] || (pendingCache[path] = db.doc(path).get());

      promise.then(doc => {
        if (stillMounted) {
          const newDoc = {
            ...doc.data(),
            id: doc.id,
          };
          setDoc(newDoc);
          cache[path] = newDoc;
          pendingCache[path] = false;
        }
      });
      return () => {
        stillMounted = false;
      };
    }
  }, [path, doc]);

  return doc || {};
};

export default useDocWithCache;
