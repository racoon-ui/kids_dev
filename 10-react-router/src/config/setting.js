const Settings = {
  siteName: 'Junior Admin',
  copyright: 'Junior Admin ©2019 ST Unitas',
  logoPath: './logo.svg',
  apiPrefix: '/api/v1',
  fixedHeader: true,
  tokenKey: 'access-token',
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://kr.tutor.com'
      : 'http://localhost:3000',
};

export default Settings;
