import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


export default function HomepageDescription() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
