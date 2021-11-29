/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Gherkin Language Support',
    image: '/img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Test description in Behavioral is written in Gherkin language.
      </>
    ),
  },
  {
    title: 'Type Safe',
    image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Behavioral was designed from the ground up with support for Typescript.
      </>
    ),
  },
  {
    title: 'Easily integrated',
    image: '/img/undraw_docusaurus_react.svg',
    description: (
      <>
        Using Behavioral does not require changing of test runner.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
