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
import { PanelBody, PanelRow, ToolbarGroup } from '@wordpress/components';

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

  const memorizedValue = useMemo(
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
  );

  const changeValue = (value) => setAttributes({
    url: value.url,
    type: value.type,
    target: value.opensInNewTab ? '_blank' : ''
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title='Link' className="full-width-control-wrapper">
          <PanelRow>
            <LinkControl
              settings={[{
                id: 'opensInNewTab',
                title: 'Open in new tab',
              }]}
              value={memorizedValue}
              onChange={changeValue}
              width="80px"
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <BlockControls>
        <ToolbarGroup>
        </ToolbarGroup>
      </BlockControls>
      <p {...useBlockProps()}>
        <InnerBlocks template={BLOCKS_TEMPLATE} templateLock={false} />
      </p>
    </>
  );
}
