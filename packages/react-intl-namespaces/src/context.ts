import * as PropTypes from 'prop-types';
import { ResourceFromNamespace } from './types';

export namespace IntlBackendContext {
  export type GetMessagesFromNamespace = (
    namespaceLoadedNotification: (resource: ResourceFromNamespace) => void,
    namespace: string,
    includeNamespace: string[],
  ) => void;

  export type AddMissingMessage = (message: MessageMetadata) => void;

  export type GetIntlProps = () => ReactIntl.IntlProvider.Props;
  export interface MessageMetadata {
    key: string;
    namespace: string;
    defaultMessage?: string;
    description?: string;
  }

  export interface DevConfigProps {
    includeMetadata: boolean;
    showIds: boolean;
    loggingEnabled: boolean;
  }
  export interface IntlBackend extends DevConfigProps {
    getMessagesFromNamespace: GetMessagesFromNamespace;
    getIntlProps: GetIntlProps;
    addMissingMessage: AddMissingMessage;
  }
  export interface Context {
    intlBackend: IntlBackend;
  }

  const intlBackendShape: PropTypes.ValidationMap<IntlBackend> = {
    getMessagesFromNamespace: PropTypes.func.isRequired,
  };

  const intlContextTypes: React.ValidationMap<Context> = {
    intlBackend: PropTypes.shape(intlBackendShape),
  };

  export function Define<P>(target: React.ComponentClass<P>) {
    target.childContextTypes = intlContextTypes;
  }
  export function Provide<P>(target: React.ComponentClass<P>) {
    target.contextTypes = { ...target.contextTypes, ...intlContextTypes };
  }
}

export namespace IntlNamespaceContext {
  interface IntlNamespace extends IntlBackendContext.DevConfigProps {
    getNameOfCurrentNamespace(): string;
    missingMessage(message: ReactIntl.FormattedMessage.MessageDescriptor): void;
  }
  export interface Context {
    intlNamespace: IntlNamespace;
  }
  const intlNamespaceShape: PropTypes.ValidationMap<IntlNamespace> = {
    missingMessage: PropTypes.func.isRequired,
  };
  export const intlContextTypes: React.ValidationMap<Context> = {
    intlNamespace: PropTypes.shape(intlNamespaceShape),
  };

  export function Define<P>(target: React.ComponentClass<P>) {
    target.childContextTypes = intlContextTypes;
  }
  export function Provide<P>(target: React.ComponentClass<P>) {
    target.contextTypes = { ...target.contextTypes, ...intlContextTypes };
  }
}