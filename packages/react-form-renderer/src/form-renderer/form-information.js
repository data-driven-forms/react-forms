import React from 'react';
import RendererContext from './renderer-context';

export const renderTitle = title => <RendererContext.Consumer>
  { ({ layoutMapper: { Title }}) => (
    <Title>{ title }</Title>
  ) }
</RendererContext.Consumer>;

export const renderDescription = description => <RendererContext.Consumer>
  { ({ layoutMapper: { Description }}) => (
    <Description>{ description }</Description>
  ) }
</RendererContext.Consumer>;
