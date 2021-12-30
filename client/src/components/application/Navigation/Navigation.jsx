import { h } from 'preact';
import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';
import { NavigationItem } from '../NavigationItem';

/**
 * @typedef {object} Props
 * @property {Models.User | null} activeUser
 * @property {() => void} onRequestOpenAuthModal
 * @property {() => void} onRequestOpenPostModal
 */

const Navigation = ({ activeUser, onRequestOpenAuthModal, onRequestOpenPostModal }) => {
  return (
    <nav className="fixed z-10 bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-300 lg:relative lg:w-48 lg:h-full lg:border-r lg:border-t-0">
      <ul className="relative grid grid-flow-col items-center justify-evenly lg:fixed lg:gap-2 lg:grid-flow-row lg:justify-start lg:p-2 lg:w-48 lg:h-full lg:auto-rows-min">
        <NavigationItem href="/" icon={<FontAwesomeIcon iconType="home" styleType="solid" />} text="ホーム" />
        {activeUser !== null ? (
          <button
          className="flex flex-col items-center justify-center w-12 h-12 hover:bg-green-50 rounded-full sm:px-2 sm:w-24 sm:h-auto sm:rounded lg:flex-row lg:justify-start lg:px-4 lg:py-2 lg:w-auto lg:h-auto lg:rounded-full"
          onClick={onRequestOpenPostModal}
        >
          <p className="text-xl lg:pr-2 lg:text-3xl">{<FontAwesomeIcon iconType="edit" styleType="solid" />}</p>
          <p className="hidden sm:inline sm:text-sm lg:text-xl lg:font-bold">{"投稿する"}</p>
        </button>
        ) : null}
        {activeUser !== null ? (
          <NavigationItem
            href={`/users/${activeUser ? activeUser.username : ''}`}
            icon={<FontAwesomeIcon iconType="user" styleType="solid" />}
            text="マイページ"
          />
        ) : null}
        {activeUser === null ? (
          <button
          className="flex flex-col items-center justify-center w-12 h-12 hover:bg-green-50 rounded-full sm:px-2 sm:w-24 sm:h-auto sm:rounded lg:flex-row lg:justify-start lg:px-4 lg:py-2 lg:w-auto lg:h-auto lg:rounded-full"
          onClick={onRequestOpenAuthModal}
        >
          <p className="text-xl lg:pr-2 lg:text-3xl">{<FontAwesomeIcon iconType="sign-in-alt" styleType="solid" />}</p>
          <p className="hidden sm:inline sm:text-sm lg:text-xl lg:font-bold">サインイン</p>
        </button>
        ) : null}
        <NavigationItem
          href="/terms"
          icon={<FontAwesomeIcon iconType="balance-scale" styleType="solid" />}
          text="利用規約"
        />
      </ul>
    </nav>
  );
};

export { Navigation };
