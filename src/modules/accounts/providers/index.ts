import { container } from 'tsyringe';

import { IHashProvider } from './HashProvider/IHashProvider';
import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider';

import { ITokenProvider } from './TokenProvider/ITokenProvider';
import { JsonWebTokenProvider } from './TokenProvider/implementations/JsonWebTokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<ITokenProvider>(
  'TokenProvider',
  JsonWebTokenProvider,
);
