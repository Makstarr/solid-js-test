import type {Component} from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {createEffect, createSignal, Match, onCleanup, onMount, Switch} from "solid-js";
import {Show} from 'solid-js'
import {For} from 'solid-js'

const App: Component = () => {
    const [counter, setCounter] = createSignal(0)
    let constCounter = counter()
    const interval = setInterval(() => setCounter(counter => counter + 1), 2000)
    onCleanup(() => clearInterval(interval))
    const dom = <div>👋</div>
    console.log(dom)
    createEffect(() => {
        constCounter = counter() + 1
        console.log(counter())
    })
    onMount(() => {
        console.log('mounted')
    })


    return (
        <div class={styles.App}>
            <header class={styles.header}>
                <img src={logo} class={styles.logo} alt="logo"/>
                <Show when={counter() > 2} fallback={<h1>Welcome guest</h1>}>
                    <h1>counter {'>'} 2 {dom}</h1>
                </Show>

                <Switch fallback={dom}>
                    <Match when={counter() > 8}>
                        counter {'>'} 8 {dom}
                    </Match>
                    <Match when={counter() > 5}>
                        counter {'>'} 5 {dom}
                    </Match>
                </Switch>

                <p>
                    Counter: {counter()}
                </p>
                <p>
                    Const counter: {constCounter}
                </p>


                <For each={[1, 2, 3]} fallback={<div>Nothing to render 🤷</div>}>
                    {(item, index) => <div>#{index} {item}</div>}
                </For>

                <button onClick={() => setCounter(0)}>Restart</button>
            </header>
        </div>
    );
};

export default App;
