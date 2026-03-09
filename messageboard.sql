--
-- PostgreSQL database dump
--

\restrict Ch9GOIkkcV7VfNNbtAElB1IggyRdy28ufKoRdu45VHk8WgQuvdoywXAtRUOVq3f

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: tack
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    userid integer,
    title character varying(50),
    message text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.messages OWNER TO tack;

--
-- Name: messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: tack
--

CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_message_id_seq OWNER TO tack;

--
-- Name: messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tack
--

ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: tack
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO tack;

--
-- Name: users; Type: TABLE; Schema: public; Owner: tack
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname text,
    lastname text,
    email character varying(255),
    password character varying(255),
    membership text
);


ALTER TABLE public.users OWNER TO tack;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tack
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO tack;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tack
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: tack
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tack
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: tack
--

COPY public.messages (message_id, userid, title, message, created_at) FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: tack
--

COPY public.session (sid, sess, expire) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tack
--

COPY public.users (id, firstname, lastname, email, password, membership) FROM stdin;
2	Pranaya	Pudasaini	pranayauni1@gmail.com	{}	admin
3	Pranaya	Pudasaini	pranayauni1@gmail.com	$2b$10$3DJuOC5rplNlOkHganpwluoa4KYQ6YJZNa5EUjJBcPLBpeu0TzD3O	admin
\.


--
-- Name: messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tack
--

SELECT pg_catalog.setval('public.messages_message_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tack
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: tack
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: tack
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tack
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: tack
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: messages messages_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tack
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Ch9GOIkkcV7VfNNbtAElB1IggyRdy28ufKoRdu45VHk8WgQuvdoywXAtRUOVq3f

