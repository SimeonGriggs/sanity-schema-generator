import React from 'react';

const Footer = () => (
  <>
    <article className="flex items-center my-12">
      <div className="typography max-w-md text-center mx-auto text-white">
        <p>
          A quick way to begin scaffolding{' '}
          <a href="https://www.sanity.io/docs/schema-types">Sanity Schema</a>.
        </p>
        <p>
          This tool will only give you the basics. For validation, layout and
          other options please read the docs.
        </p>

        <p>
          <a
            href="https://www.simeongriggs.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            simeonGriggs
          </a>{' '}
          |{' '}
          <a
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
