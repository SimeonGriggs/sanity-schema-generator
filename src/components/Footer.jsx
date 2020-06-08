import React from 'react';

const Footer = () => (
  <>
    <article className="flex items-center my-12">
      <div className="max-w-sm ml-auto text-center mx-auto">
        <p className="pb-5">
          A quick way to begin scaffolding
          <a
            className="text-green-400"
            href="https://www.sanity.io/docs/schema-types"
          >
            {' '}
            Sanity Schema
          </a>
          .
        </p>
        <p className="pb-5">
          This tool will only give you the basics. For validation, layout and
          other options please read the docs.
        </p>

        <p className="pb-5">
          <a
            className="text-green-400"
            href="https://www.simeongriggs.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            simeonGriggs
          </a>{' '}
          |{' '}
          <a
            className="text-green-400"
            href="https://github.com/SimeonGriggs/sanity-schema-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </article>
  </>
);

export default Footer;
