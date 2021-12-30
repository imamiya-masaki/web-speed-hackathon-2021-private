import {h} from 'preact'
import { Link } from 'preact-router/match';
import { useState, useCallback } from 'preact/hooks';
import { ModalErrorMessage } from '../../modal/ModalErrorMessage';
import { ModalSubmitButton } from '../../modal/ModalSubmitButton';
import { AuthInput } from '../AuthInput';

/**
 * @typedef {object} SubmitParams
 * @property {string} name
 * @property {string} password
 * @property {'signin' | 'signup'} type
 * @property {string} username
 */

/**
 * @typedef {object} Props
 * @property {boolean} hasError
 * @property {boolean} isLoading
 * @property {() => void} onRequestCloseModal
 * @property {() => void} onResetError
 * @property {(params: SubmitParams) => void} onSubmit
 */

const AuthModalPage = ({ hasError, isLoading, onRequestCloseModal, onResetError, onSubmit }) => {
  /** @type {[SubmitParams, (params: SubmitParams) => SubmitParams]} */
  const [params, setParams] = useState({ name: '', password: '', type: 'signin', username: '' });

  const handleToggleType = useCallback(() => {
    onResetError();
    setParams((params) => ({
      ...params,
      type: params.type === 'signin' ? 'signup' : 'signin',
    }));
  }, [onResetError]);

  const handleChangeUsername = useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      username: value,
    }));
  }, []);
  const handleChangeName = useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      name: value,
    }));
  }, []);

  const handleChangePassword = useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      password: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault();
      onResetError();
      onSubmit(params);
    },
    [params, onSubmit, onResetError],
  );

  const isFilled =
    params.username !== '' && params.password !== '' && (params.type === 'signup' ? params.name !== '' : true);

  return (
    <section>
      <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold">{params.type === 'signin' ? 'サインイン' : '新規登録'}</h2>
        <p className="mt-4">
          <button className="text-green-600 underline" onClick={handleToggleType} type="button">
            {params.type === 'signin' ? '初めての方はこちら' : 'サインインはこちら'}
          </button>
        </p>
        <span className="mt-8">
          <AuthInput label="ユーザー名" onChange={handleChangeUsername} type="text" />
        </span>
        {params.type === 'signup' ? (
          <span className="mt-4">
            <AuthInput label="名前" onChange={handleChangeName} type="text" />
          </span>
        ) : null}
        <span className="mt-4">
          <AuthInput
            autoComplete={params.type === 'signup' ? 'new-password' : 'current-password'}
            label="パスワード"
            onChange={handleChangePassword}
            type="password"
          />
        </span>
        {params.type === 'signup' ? (
          <span className="mt-4">
            <Link className="text-green-600 underline" onClick={onRequestCloseModal} href="/terms">
              利用規約
            </Link>
            に同意して
          </span>
        ) : null}
        <span className="mt-4">
          <ModalSubmitButton disabled={isLoading || !isFilled} loading={isLoading}>
            {params.type === 'signin' ? 'サインイン' : '登録する'}
          </ModalSubmitButton>
        </span>
        <span className="mt-4">
          <ModalErrorMessage>
            {hasError ? (params.type === 'signin' ? 'パスワードが異なります' : 'ユーザー名が使われています') : null}
          </ModalErrorMessage>
        </span>
      </form>
    </section>
  );
};

export { AuthModalPage };
