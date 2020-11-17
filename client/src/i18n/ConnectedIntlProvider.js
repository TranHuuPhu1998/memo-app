import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translations from './locales/locales';

function mapStateToProps(state) {
  const lang = state.locale === 'vn' ? 'vi' : (state.locale === 'jp' ? 'ja' : 'en');
  const messages = translations[lang];
  return { locale: lang, messages: messages };
}

export default connect(mapStateToProps)(IntlProvider);