import React from 'react';
import dragula from 'react-dragula';
import './example.css';
import './styles.css';

var classes = {
    draggingClass: 'isDragging',
    hoveredClass: 'isOverMe'
};

var App = React.createClass({
    render: function () {
        return <div className="container">
            <div className="wrapper" id="container1">
                <div id="one">One</div>
            </div>
            <div className="wrapper" id="container2">
                <div id="two">Two</div>
            </div>
            <div className="wrapper" id="container3">
                <div id="three">Three</div>
            </div>
            <div className="wrapper" id="container4">
                <div id="four">Four</div>
            </div>
        </div>
    },
    componentDidMount: function () {
        var container = React.findDOMNode(this);
        var drake = dragula(
            [
                document.getElementById('container1'),
                document.getElementById('container2'),
                document.getElementById('container3'),
                document.getElementById('container4'),
                document.getElementById('container5')
            ], {
                copy: true
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
            console.log('el: ', el, ', target: ', target, ', source: ', source, ', sibling: ', sibling);
            el.classList.remove(classes.draggingClass);

            var elementToBeDeleted;
            var myNode = document.getElementById(target.id);
            while (myNode.firstChild) {
                elementToBeDeleted = myNode.firstChild;
                myNode.removeChild(myNode.firstChild);
            }

            target.append(el);

            var myNode = document.getElementById(source.id);
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            source.append(elementToBeDeleted);


            var arr = Array.from(document.getElementsByClassName('isOverMe'));

            arr.forEach(function(element) {
                element.classList.remove('isOverMe');
            });
        });
    }
});
React.render(<App />, document.getElementById('examples'));
