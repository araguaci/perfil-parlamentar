import React, { Component } from "react";
import Candidato from "./Candidato";

import { connect } from "react-redux";

import FlipMove from "react-flip-move";

import { estados, partidos } from "../../constantes/filtrosSeletoresCandidatos";
import isEmpty from "../../validation/is-empty";

import {
  calculaScore,
  getTopNCandidatos,
  getDadosCandidatos
} from "../../actions/candidatosActions";

import PropTypes from "prop-types";
import Spinner from "../common/Spinner";

import Apresentacao from "./apresentacao";

import "../../styles/style.css";

const NUM_CANDIDATOS = 10;

class CandidatosContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scoreCandidatos: {},
      candidatosRanking: [],
      candidatosFiltrados: [],
      filtro: { nome: "", partido: "", estado: "" }
    };

    this.buscaNome = this.buscaNome.bind(this);
    this.buscaEstado = this.buscaEstado.bind(this);
    this.buscaPartido = this.buscaPartido.bind(this);
  }

  buscaNome(e) {
    e.preventDefault();

    let filtro = {
      nome: e.target.value,
      partido: this.state.filtro.partido,
      estado: this.state.filtro.estado
    };

    let keys = Object.keys(this.props.candidatos.dadosCandidatos);

    let nomesFiltrados = keys.filter(candidato_id => {
      return (
        this.props.candidatos.dadosCandidatos[candidato_id].nome
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) >= 0
      );
    });

    this.setState({ filtro, candidatosFiltrados: nomesFiltrados });
  }

  buscaEstado(e) {
    e.preventDefault();

    let filtro = {
      nome: this.state.filtro.nome,
      partido: this.state.filtro.partido,
      estado: e.target.value
    };

    this.setState({ filtro });
  }

  buscaPartido(e) {
    e.preventDefault();

    let filtro = {
      nome: this.state.filtro.nome,
      partido: e.target.value,
      estado: this.state.filtro.estado
    };

    this.setState({ filtro });
  }

  render() {
    // Inviável fazer no front, tem que fazer nas funções de nuvens.
    let candidatosMapeaveis;
    if (this.state.filtro.nome !== "") {
      candidatosMapeaveis = this.state.candidatosFiltrados;
    } else {
      candidatosMapeaveis = this.state.candidatosRanking.map(cand => cand[0]);
    }

    const candidatos = candidatosMapeaveis.map(elem => {
      const candidato = this.props.candidatos.dadosCandidatos[elem];

      return (
        <Candidato
          key={candidato.cpf}
          nome={candidato.nome_urna}
          siglaPartido={candidato.sg_partido}
          estado={candidato.uf}
          score={this.state.scoreCandidatos[candidato.cpf]}
          respostas={candidato.respostas}
          foto={candidato.foto}
        />
      );
    });

    return (
      <div>
        <div className="panel-master-header">
          <ul className="nav nav-tabs nav-tabs-secondary">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Candidatos
              </a>
            </li>
          </ul>
        </div>
        <div className="container">
          <header className="panel-header">
            {false ? <Apresentacao /> : null}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text input-group-text-secondary"
                  id="search-candidate"
                >
                  <span className="icon-search" />
                </span>
              </div>
              <input
                type="text"
                className="form-control form-control-secondary"
                placeholder="Pesquisar candidato..."
                aria-label="Pesquisar candidato"
                aria-describedby="search-candidate"
              />
            </div>
          </header>

          {this.props.candidatos.isCarregando ? (
            <div style={{ paddingTop: "30vh" }}>
              <Spinner />
            </div>
          ) : (
            <div className="candidatos">
              {/*<div className="row">
              <div className="col-8 col-xs-8 col-md-8 col-lg-8">
                <input
                  className="barra-filtro-candidato form-control"
                  id="myInput"
                  type="text"
                  placeholder="Nome"
                  onChange={this.buscaNome}
                />
              </div>
              <div className="col-2 col-xs-2 col-md-2 col-lg-2">
                <select
                  className="form-control barra-filtro-candidato"
                  placeholder="Partidos"
                  onChange={this.buscaPartido}
                >
                  {partidos()}
                </select>
              </div>
              <div className="col-2 col-xs-2 col-md-2 col-lg-2">
                <select
                  className="form-control barra-filtro-candidato"
                  placeholder="Estados"
                  onChange={this.buscaEstado}
                >
                  {estados()}
                </select>
              </div>
        </div>*/}
              <FlipMove>{candidatos}</FlipMove>
            </div>
          )}
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.candidatos.scoreCandidatos) {
      this.setState({
        scoreCandidatos: nextProps.candidatos.scoreCandidatos,
        candidatosRanking: nextProps.getTopNCandidatos(NUM_CANDIDATOS)
      });
    }
  }

  componentDidMount() {
    if (isEmpty(this.props.candidatos.dadosCandidatos)) {
      this.props.getDadosCandidatos();
    } else {
      this.setState({
        scoreCandidatos: this.props.candidatos.scoreCandidatos,
        candidatosRanking: this.props.getTopNCandidatos(NUM_CANDIDATOS)
      });
    }
  }
}

CandidatosContainer.propTypes = {
  calculaScore: PropTypes.func.isRequired,
  getTopNCandidatos: PropTypes.func.isRequired,
  getDadosCandidatos: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  candidatos: state.candidatosReducer
});

export default connect(
  mapStateToProps,
  { calculaScore, getTopNCandidatos, getDadosCandidatos }
)(CandidatosContainer);
