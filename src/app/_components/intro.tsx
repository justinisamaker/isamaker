import Image from 'next/image';

export function Intro() {
  return (
    <section className="mt-14 md:mt-2 mb-12">
      <div className="prose w-full max-w-none">
        <div className="hidden md:block md:float-right md:w-64 md:ml-10">
          <Image
            src="/assets/headshot.jpg"
            alt="A photo of Justin Smith"
            width={400}
            height={400}
            className="w-full h-auto shadow-xl"
          />
        </div>
        <h2 className="font-bold leading-tight text-4xl text-slate-dark mb-4 mt-0">
          Hello, I'm Justin.
        </h2>
        <p>
          <strong>
            I’m a JavaScript developer who loves designing for humans.
          </strong>{' '}
          My background spans front‑end engineering, fine arts, and hands‑on
          maker culture. I naturally gravitate towards well-designed projects
          where creativity, technology, and human ingenuity work hand in hand.
        </p>

        <p>
          I specialize in modern web apps, primarily using{' '}
          <strong>JavaScript, React, and strong design systems</strong>. I’m
          equally comfortable developing design systems (and documentation), or
          jumping into PHP, Python, or proof-of-concept prototypes when a
          project needs momentum. I like solving problems with both structure
          and imagination on well-oiled teams working in an agile methodology.
        </p>

        <p>
          Right now, I’m a <strong>senior front-end developer</strong> on a
          small team at Intralox focused on modernizing our multi‑brand web
          ecosystem. We use tools like Kontent.ai, React, Tailwind, Storybook,
          and Sitecore to build fast, flexible experiences that empower both
          users and content editors.
        </p>

        <p>
          <strong>
            I’m currently looking for new engineering roles in the Greater New
            Orleans area or on a remote‑friendly team.
          </strong>{' '}
          Ideally, I'd like to find a position that allows me to remain an
          individual contributor. I enjoy projects that find new ways to engage
          users outside of a screen, but I'm also more than happy to work on
          traditional web apps.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-12 w-full">
        <div className="md:w-1/2">
          <h5 className="font-semibold mb-2">Want to know more?</h5>
          <p>
            <a
              href="/assets/justin-smith-resume.html"
              target="_new"
              className="text-blue-500 hover:text-blue-400"
            >
              Check out my resume.
            </a>{' '}
            You can find me on{' '}
            <a
              href="https://www.linkedin.com/in/justinisamaker/"
              target="_new"
              className="text-blue-500 hover:text-blue-400"
            >
              LinkedIn
            </a>{' '}
            and{' '}
            <a
              href="https://github.com/justinisamaker"
              target="_new"
              className="text-blue-500 hover:text-blue-400"
            >
              GitHub
            </a>
            , although I'm mostly active on private corporate GitHub accounts.
            You can also reach me via e-mail at{' '}
            <a
              href="mailto:justin@isamaker.com"
              className="text-blue-500 hover:text-blue-400"
            >
              justin@isamaker.com
            </a>
            .
          </p>
        </div>
        <div className="md:w-1/2">
          <h5 className="font-semibold mb-2">Select clients</h5>
          <p>
            Google, Nike, Nissan, United Airlines, ComEd, A.C. Moore, USAA,
            Prota Ventures, DeepLocal
          </p>
        </div>
      </div>
    </section>
  );
}
