import { h } from 'preact';
import { Link } from 'preact-router/match';
/**
 * @typedef {object} Props
 * @property {string} text
 * @property {string} [href]
 * @property {() => void} [onClick]
 */

const NavigationItem = ({ href, icon, text }) => {
  return (
    <li>
      <Link class='flex flex-col items-center justify-center w-12 h-12 hover:bg-green-50 rounded-full sm:px-2 sm:w-24 sm:h-auto sm:rounded lg:flex-row lg:justify-start lg:px-4 lg:py-2 lg:w-auto lg:h-auto lg:rounded-full'
      activeClassName='text-green-800'
      href={href}>
        <p className="text-xl lg:pr-2 lg:text-3xl">{icon}</p>
        <p className="hidden sm:inline sm:text-sm lg:text-xl lg:font-bold">{text}</p>
      </Link>
    </li>
  );
};

export { NavigationItem };
