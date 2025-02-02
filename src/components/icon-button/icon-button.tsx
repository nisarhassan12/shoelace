import { Component, Prop, h } from '@stencil/core';
import { focusVisible } from '../../utilities/focus-visible';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */

@Component({
  tag: 'sl-icon-button',
  styleUrl: 'icon-button.scss',
  shadow: true
})
export class IconButton {
  button: HTMLButtonElement;

  /** The name of the icon to draw. */
  @Prop({ reflect: true }) name: string;

  /** The name of a registered custom icon library. */
  @Prop({ reflect: true }) library: string;

  /** An external URL of an SVG file. */
  @Prop({ reflect: true }) src: string;

  /** An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. */
  @Prop({ reflect: true }) label: string;

  /** Set to true to disable the button. */
  @Prop({ reflect: true }) disabled = false;

  componentDidLoad() {
    focusVisible.observe(this.button);
  }

  disconnectedCallback() {
    focusVisible.unobserve(this.button);
  }

  render() {
    return (
      <button
        ref={el => (this.button = el)}
        part="base"
        class={{
          'icon-button': true,
          'icon-button--disabled': this.disabled
        }}
        type="button"
      >
        <sl-icon library={this.library} name={this.name} src={this.src} label={this.label} />
      </button>
    );
  }
}
