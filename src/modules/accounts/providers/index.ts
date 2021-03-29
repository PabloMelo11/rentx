import { container } from 'tsyringe';

import { IHashProvider } from './HashProvider/IHashProvider';
import { HashProviderBCrypt } from './HashProvider/implementations/bcrypt/HashProvider';

import { ITokenProvider } from './TokenProvider/ITokenProvider';
import { TokenProviderJsonWebToken } from './TokenProvider/implementations/jsonwebtoken/TokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProviderBCrypt);

container.registerSingleton<ITokenProvider>(
  'TokenProvider',
  TokenProviderJsonWebToken,
);
