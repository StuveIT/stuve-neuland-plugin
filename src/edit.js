/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { useMemo } from 'react';

/**
 * Imports the InspectorControls component, which is used to wrap
 * the block's custom controls that will appear in in the Settings
 * Sidebar when the block is selected.
 *
 * Also imports the React hook that is used to mark the block wrapper
 * element. It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, BlockControls, useBlockProps, InspectorControls, LinkControl } from '@wordpress/block-editor';
import { PanelBody, PanelRow, Popover, Toolbar, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { link } from '@wordpress/icons';
import { useState } from '@wordpress/element';

import './editor.scss';

const BLOCKS_TEMPLATE = [
  ['core/paragraph', { placeholder: 'Kachel' }],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

  console.log( attributes );

  /* const memorizedValue = useMemo(
    () => ({
      url: attributes.url,
      type: attributes.type,
      opensInNewTab: attributes.target === '_blank',
      title: '',
    }),
    [
      attributes.url,
      attributes.type,
      attributes.target
    ]
  ); */
  const memorizedValue = attributes;

  // console.log( attributes.url );

  const changeValue = (value) => {
    setAttributes({
    url: value.url,
    type: value.type,
    target: value.opensInNewTab ? '_blank' : ''
  })};

  const removeValue = () => setAttributes({
    url: undefined,
    type: undefined,
    target: '_blank'
  });

  const [ isEditingURL, setIsEditingURL ] = useState( false );
  const [ popoverAnchor, setPopoverAnchor ] = useState( null );

  return (
    <>
      <InspectorControls>
      </InspectorControls>
      <BlockControls>
        <Toolbar>
          <ToolbarButton
            title='Link'
            icon={ link }
            ref={ setPopoverAnchor }
            onClick={ () => setIsEditingURL( true ) }
            isActive={
              !! attributes.url ||
              isEditingURL
            }
          />
          { isEditingURL && (
            <Popover
              anchor={ popoverAnchor }
              onClose={ () => setIsEditingURL( false ) }
              placement="bottom"
              focusOnMount={ true }
              offset={ 12 }
            >
              <LinkControl
                settings={[{
                  id: 'opensInNewTab',
                  title: 'Open in new tab',
                }]}
                value={memorizedValue}
                onChange={changeValue}
                onRemove={removeValue}
                showInitialSuggestions={ true }
              />
            </Popover>
          ) }
        </Toolbar>
      </BlockControls>
      <p {...useBlockProps()}>
        <InnerBlocks template={BLOCKS_TEMPLATE} templateLock={false} />
      </p>
    </>
  );
}
