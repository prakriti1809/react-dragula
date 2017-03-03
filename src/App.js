import React from 'react';
import dragula from 'react-dragula';
import './example.css';
import './styles.css';
import TilesList from './components/TilesList';

var classes = {
    draggingClass: 'isDragging',
    hoveredClass: 'isOverMe'
};
var draggableNodes = [];
var App = React.createClass({
    render: function () {
        //
        // return <div className="container">
        //     <div className="wrapper" id="container1">
        //         <div id="one" onClick={ () => {console.log('one clicked')} }>One</div>
        //     </div>
        //     <div className="wrapper" id="container2">
        //         <div id="two"  onClick={ () => {console.log('two clicked')} }>Two</div>
        //     </div>
        //     <div className="wrapper" id="container3">
        //         <div id="three" onClick={ () => {console.log('three clicked')} }>Three</div>
        //     </div>
        //     <div className="wrapper" id="container4">
        //         <div id="four" onClick={ () => {console.log('four clicked')} }>Four</div>
        //     </div>
        //     <div className="wrapper" id="container5">
        //         <div id="four" onClick={ () => {console.log('five clicked')} }>Five</div>
        //     </div>
        //     <div className="wrapper" id="container6">
        //         <div id="four" onClick={ () => {console.log('six clicked')} }>Six</div>
        //     </div>
        //
        // </div>
        //
        return <TilesList/>
    },
    getDomNode: function(node) {
        console.log('this is the node')
        console.log(node)
        draggableNodes.push(node);
    },
    componentDidMount: function () {

        var thizz = this;
        var container = React.findDOMNode(this);

        console.log('refs: ', thizz.refs);
        console.log('container: ', container);
        var drake = dragula(
            [
                // document.getElementById('container1'),
                // document.getElementById('container2'),
                // document.getElementById('container3'),
                // document.getElementById('container4'),
                // document.getElementById('container5'),
                // document.getElementById('container6'),
                container
            ], {
                copy: true,
                revertOnSpill: true,
            }
        );

        drake.on('drag', function (el) {
            setTimeout(function() {
                el.classList.add(classes.draggingClass);
            }, 100);
        });

        drake.on('dragend', function (el) {
            Array.from(document.getElementsByClassName(classes.draggingClass)).forEach(function (element) {
                element.classList.remove(classes.draggingClass);
            });
        });
        drake.on('over', function(element, container, source) {
            var children = Array.from(container.children);
            var dropTarget = children.find(function(child) {
                if(child.id !== element.id) {
                    child.classList.add(classes.hoveredClass);
                    return true;
                }
            });
        });


        drake.on('out', function (el, container, source) {
            Array.from(document.getElementById(container.id).getElementsByClassName(classes.hoveredClass)).forEach(function (element) {
                element.classList.remove(classes.hoveredClass);
            });
        });

        drake.on('drop', function (el, target, source, sibling) {
            el.classList.remove(classes.draggingClass);

            var elementToBeDeleted;

            if(target && source && sibling != null) {
                while (target.firstChild) {
                    elementToBeDeleted = target.firstChild;
                    target.removeChild(target.firstChild);
                }

                target.append(el);

                while (source.firstChild) {
                    source.removeChild(source.firstChild);
                }

                source.append(elementToBeDeleted);

                var arr = Array.from(document.getElementsByClassName('isOverMe'));

                arr.forEach(function(element) {
                    element.classList.remove('isOverMe');
                });
            }

        });
    }
});
React.render(<App />, document.getElementById('examples'));
