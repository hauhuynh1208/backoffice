import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ContextMenu.css";

class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
      height: 0,
      width: 0,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside, true);
    const { clientHeight, clientWidth } = document.getElementsByClassName(
      "context-menu"
    )[0];
    this.setState({ height: clientHeight, width: clientWidth });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside, true);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.isOpen && prevState.opacity !== 1) {
      update.opacity = 1;
    } else if (!nextProps.isOpen && prevState.opacity !== 0) {
      update.opacity = 0;
    }
    return Object.keys(update).length ? update : null;
  }

  handleClickOutside = (event) => {
    if (!this.props.isOpen) return;
    const innerDom = document.getElementsByClassName("context-menu")[0];
    if (!innerDom || !innerDom.contains(event.target)) {
      this.setState({ opacity: 0 }, () => this.props.toggleFunc());
    }
  };

  getMenuPosition = (x = 0, y = 0) => {
    if (!this.props.isOpen) return { top: -1, left: -1 };
    let menuStyles = { top: y, left: x };
    const { width, height } = this.state;
    const { innerWidth, innerHeight } = window;
    if (y + height > innerHeight) menuStyles.top -= height;
    if (x + width > innerWidth) menuStyles.left -= width;

    if (menuStyles.top < 0) {
      menuStyles.top = height < innerHeight ? (innerHeight - height) / 2 : 0;
    }

    if (menuStyles.left < 0) {
      menuStyles.left = width < innerWidth ? (innerWidth - width) / 2 : 0;
    }
    return menuStyles;
  };

  renderContextItem = () => {
    const { options, actionData, actionIndex } = this.props;
    let selectEles = options.map((select, index) => {
      return (
        <React.Fragment key={index}>
          <li
            className={`item ${
              select.className && select.className(actionData, actionIndex)
            }`}
            onClick={() => {
              if (select.action) {
                select.action(actionData, actionIndex);
              }
              this.props.toggleFunc();
            }}
          >
            <span>{select.name}</span>
          </li>
          {index + 1 < options.length && <div className="divider" />}
        </React.Fragment>
      );
    });
    return (
      <div>
        <ul className="items">{selectEles}</ul>
      </div>
    );
  };

  render() {
    const { coord } = this.props;
    let style = { opacity: this.state.opacity, top: -200, left: -200 };
    if (coord) {
      style = Object.assign(style, this.getMenuPosition(coord.x, coord.y));
    }
    return (
      <div className="context-menu" style={style}>
        {this.renderContextItem()}
      </div>
    );
  }
}

export default ContextMenu;

ContextMenu.propTypes = {
  //array of array of objects, which contains action name and its binding function
  options: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleFunc: PropTypes.func.isRequired,
  coord: PropTypes.object,
  actionData: PropTypes.object,
  actionIndex: PropTypes.number,
};
