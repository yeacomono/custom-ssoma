(async () => {
    // Functions
    async function alerta_licencia_certificado() {
        let messageAlert =`
                <div class="section-head text-center mx-4 mt-3 text-uppercase font-weight-bold">
                    ALERTA LICENCIAS Y CERTIFICADOS
                </div>
				<div class="mt-4 mb-4 frappe-control form-group mx-4" data-fieldtype="Table" data-fieldname="table_licencias" title="table_licencias">
    				<div class="form-grid">
						  <div class="grid-heading-row">
							<div class="grid-row">
							  <div class="data-row row">
								<div class="head col grid-static-col col-xs-6 mt-3" data-fieldname="tipo_de_servicio" data-fieldtype="Link" title="Tipo de Servicio">
								  <div class="field-area static-area ellipsis text-uppercase text-center font-weight-bold">Licencia / Certificado</div>
								</div>
								<div class="head col grid-static-col col-xs-3 mt-3" data-fieldname="tipo_de_servicio" data-fieldtype="Link" title="Tipo de Servicio">
								  <div class="field-area static-area ellipsis text-uppercase text-center font-weight-bold">Por Vencer</div>
								</div>
								<div class="head col grid-static-col col-xs-3 mt-3" data-fieldname="tipo_de_servicio" data-fieldtype="Link" title="Tipo de Servicio">
								  <div class="field-area static-area ellipsis text-uppercase text-center font-weight-bold">Vencidos</div>
								</div>
							  </div>
							</div>
							<div class="grid-body">
                                <div class="rows">
                                    <div class="spinner-border text-primary" role="status" id="loading_spinner" style="margin-left: 405px;margin-top: 10px; margin-bottom: 5px">
                                      <span class="visually-hidden"></span>
                                    </div>
                                    <div id="table_data_licencias" style="display: none">
                                    </div>
                                    <div id="table__not_data_licencias" class="grid-empty text-center" style="display: none">
                                        <img src="https://capacitacion.shalom.com.pe/assets/frappe/images/ui-states/grid-empty-state.svg" alt="Grid Empty State" class="grid-empty-illustration">
                                        No hay datos
                                    </div>
                                </div>
				  	        </div>
						  </div>
    				</div>
  				</div>`

        frappe.msgprint({
            title: __('Notification'),
            message: __(messageAlert)
        });

        let tamanoModal = document.getElementsByClassName('modal-content')
        let tamanoModalGeneral = document.getElementsByClassName('modal-dialog')

        setTimeout( async ()=>{
            tamanoModal[0].style.width = "900px"
            tamanoModalGeneral[0].style.maxWidth = "800px"
            $('.head').css({'height': '40px'});

            const getDocumentsLicencias = await frappe.db.get_list('Licencias y Certificados', {
                'filters': [],
                'limit': 'None',
                'fields': ['name','fecha_de_fin_1', 'fecha_de_fin_2', 'fecha_de_fin_3', 'fecha_de_fin_4', 'fecha_de_fin_5', 'fecha_de_fin_6', 'fecha_de_fin_7', 'fecha_de_fin_8']
            });

            if ( getDocumentsLicencias.length === 0 ) {
                $('#loading_spinner').hide();
                frappe.hide_msgprint()
                return false
            }

            let table_data_licencias = document.getElementById('table_data_licencias')
            let fechaActual = moment().format("YYYY-MM-DD")
            let fechaSubtractOneMonth = moment(fechaActual).add(1, 'month').format("YYYY-MM-DD")

            let documentForRevision = {
                licenciaFuncionamiento: {
                    porVencer: 0,
                    vencidos: 0,
                    name: "Licencia de Funcionamiento",
                    path_por_vencer: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_1=%5B%22Between%22%2C%5B%22" + fechaActual + "%22%2C%22" + fechaSubtractOneMonth + "%22%5D%5D&fecha_de_fin_1=%5B%22is%22%2C%22set%22%5D",
                    parth_vencido: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_1=%5B%22is%22%2C%22set%22%5D&fecha_de_fin_1=%5B%22%3C%22%2C%22"+ fechaActual +"%22%5D"
                },
                licenciaAnunciosPubliciarios: {
                    porVencer: 0,
                    vencidos: 0,
                    name: "Licencia de Anuncios Publicitarios",
                    path_por_vencer: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_2=%5B%22Between%22%2C%5B%22" + fechaActual + "%22%2C%22" + fechaSubtractOneMonth + "%22%5D%5D&fecha_de_fin_2=%5B%22is%22%2C%22set%22%5D",
                    parth_vencido: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_2=%5B%22is%22%2C%22set%22%5D&fecha_de_fin_2=%5B%22%3C%22%2C%22"+ fechaActual +"%22%5D"
                },
                certificadoItse: {
                    porVencer: 0,
                    vencidos: 0,
                    name: "Certificado Itse",
                    path_por_vencer: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_3=%5B%22Between%22%2C%5B%22" + fechaActual + "%22%2C%22" + fechaSubtractOneMonth + "%22%5D%5D&fecha_de_fin_3=%5B%22is%22%2C%22set%22%5D",
                    parth_vencido: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_3=%5B%22is%22%2C%22set%22%5D&fecha_de_fin_3=%5B%22%3C%22%2C%22"+ fechaActual +"%22%5D"
                },
                certificadoFumigacion: {
                    porVencer: 0,
                    vencidos: 0,
                    name: "Certificado de Fumigacion",
                    path_por_vencer: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_4=%5B%22Between%22%2C%5B%22" + fechaActual + "%22%2C%22" + fechaSubtractOneMonth + "%22%5D%5D&fecha_de_fin_4=%5B%22is%22%2C%22set%22%5D",
                    parth_vencido:"https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_4=%5B%22is%22%2C%22set%22%5D&fecha_de_fin_4=%5B%22%3C%22%2C%22"+ fechaActual +"%22%5D"
                },
                certificadoPozoTierra: {
                    porVencer: 0,
                    vencidos: 0,
                    name: "Certificado Pozo a Tierra",
                    path_por_vencer: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_5=%5B%22Between%22%2C%5B%22" + fechaActual + "%22%2C%22" + fechaSubtractOneMonth + "%22%5D%5D&fecha_de_fin_5=%5B%22is%22%2C%22set%22%5D",
                    parth_vencido:"https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_5=%5B%22is%22%2C%22set%22%5D&fecha_de_fin_5=%5B%22%3C%22%2C%22"+ fechaActual +"%22%5D"
                },
                certificadoExtintores: {
                    porVencer: 0,
                    vencidos: 0,
                    name: "Certificado de Extintores",
                    path_por_vencer: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_6=%5B%22Between%22%2C%5B%22" + fechaActual + "%22%2C%22" + fechaSubtractOneMonth + "%22%5D%5D&fecha_de_fin_6=%5B%22is%22%2C%22set%22%5D",
                    parth_vencido: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_6=%5B%22is%22%2C%22set%22%5D&fecha_de_fin_6=%5B%22%3C%22%2C%22"+ fechaActual +"%22%5D"
                },
                certificadoDetectoresHumo: {
                    porVencer: 0,
                    vencidos: 0,
                    name: "Certificado de Detectores de Humo",
                    path_por_vencer: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_7=%5B%22Between%22%2C%5B%22" + fechaActual + "%22%2C%22" + fechaSubtractOneMonth + "%22%5D%5D&fecha_de_fin_7=%5B%22is%22%2C%22set%22%5D",
                    parth_vencido:"https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_7=%5B%22is%22%2C%22set%22%5D&fecha_de_fin_7=%5B%22%3C%22%2C%22"+ fechaActual +"%22%5D"
                },
                certificadoLucesEmergencia: {
                    porVencer: 0,
                    vencidos: 0,
                    name: "Certificado de Luces de Emergencia",
                    path_por_vencer: "https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_8=%5B%22Between%22%2C%5B%22" + fechaActual + "%22%2C%22" + fechaSubtractOneMonth + "%22%5D%5D&fecha_de_fin_8=%5B%22is%22%2C%22set%22%5D",
                    parth_vencido:"https://capacitacion.shalom.com.pe/app/licencias-y-certificados?fecha_de_fin_8=%5B%22is%22%2C%22set%22%5D&fecha_de_fin_8=%5B%22%3C%22%2C%22"+ fechaActual +"%22%5D"
                },
            }

            let fechaLicenciaFuncionamiento = ''
            let fechaLicenciaFuncionamientoPorvencer = ''
            let fechaLicenciaFuncionamientoVencido = ''

            let fechaLicenciaAnunciosPubliciarios = ''
            let fechaLicenciaAnunciosPubliciariosPorVencer = ''
            let fechaLicenciaAnunciosPubliciariosVencido = ''

            let fechaCertificadoItse = ''
            let fechaCertificadoItsePorVencer = ''
            let fechaCertificadoItseVencido = ''

            let fechaCertificadoFumigacion = ''
            let fechaCertificadoFumigacionPorVencer = ''
            let fechaCertificadoFumigacionVencido = ''

            let fechaCertificadoPozoTierra = ''
            let fechaCertificadoPozoTierraPorVencer = ''
            let fechaCertificadoPozoTierraVencido = ''

            let fechaCertificadoExtintores = ''
            let fechaCertificadoExtintoresPorVencer = ''
            let fechaCertificadoExtintoresVencido = ''

            let fechaCertificadoDetectoresHumo = ''
            let fechaCertificadoDetectoresHumoPorVencer = ''
            let fechaCertificadoDetectoresHumoVencido = ''

            let fechaCertificadoLucesEmergencia = ''
            let fechaCertificadoLucesEmergenciaPorVencer = ''
            let fechaCertificadoLucesEmergenciaVencido = ''

            for (let item of getDocumentsLicencias) {

                if ( item.fecha_de_fin_1 ) {
                    fechaLicenciaFuncionamiento = moment(item.fecha_de_fin_1).format("YYYY-MM-DD")
                    fechaLicenciaFuncionamientoPorvencer = moment(fechaLicenciaFuncionamiento).subtract(1, 'month').format("YYYY-MM-DD")
                    fechaLicenciaFuncionamientoVencido = moment(fechaLicenciaFuncionamiento).add(1, 'days').format("YYYY-MM-DD")

                    if (fechaActual >= fechaLicenciaFuncionamientoVencido) {
                        documentForRevision.licenciaFuncionamiento.vencidos++
                    } else if (fechaLicenciaFuncionamientoPorvencer <= fechaActual) {
                        documentForRevision.licenciaFuncionamiento.porVencer++
                    }
                }

                if ( item.fecha_de_fin_2 ) {
                    fechaLicenciaAnunciosPubliciarios = moment(item.fecha_de_fin_2).format("YYYY-MM-DD")
                    fechaLicenciaAnunciosPubliciariosPorVencer = moment(fechaLicenciaAnunciosPubliciarios).subtract(1, 'month').format("YYYY-MM-DD")
                    fechaLicenciaAnunciosPubliciariosVencido = moment(fechaLicenciaAnunciosPubliciarios).add(1, 'days').format("YYYY-MM-DD")

                    if (fechaActual >= fechaLicenciaAnunciosPubliciariosVencido) {
                        documentForRevision.licenciaAnunciosPubliciarios.vencidos++
                    } else if (fechaLicenciaAnunciosPubliciariosPorVencer <= fechaActual) {
                        documentForRevision.licenciaAnunciosPubliciarios.porVencer++
                    }
                }

                if ( item.fecha_de_fin_3 ) {
                    fechaCertificadoItse = moment(item.fecha_de_fin_3).format("YYYY-MM-DD")
                    fechaCertificadoItsePorVencer = moment(fechaCertificadoItse).subtract(1, 'month').format("YYYY-MM-DD")
                    fechaCertificadoItseVencido = moment(fechaCertificadoItse).add(1, 'days').format("YYYY-MM-DD")

                    if (fechaActual >= fechaCertificadoItseVencido) {
                        documentForRevision.certificadoItse.vencidos++
                    } else if (fechaCertificadoItsePorVencer <= fechaActual) {
                        documentForRevision.certificadoItse.porVencer++
                    }
                }


                if ( item.fecha_de_fin_4 ) {
                    fechaCertificadoFumigacion = moment(item.fecha_de_fin_4).format("YYYY-MM-DD")
                    fechaCertificadoFumigacionPorVencer = moment(fechaCertificadoFumigacion).subtract(1, 'month').format("YYYY-MM-DD")
                    fechaCertificadoFumigacionVencido = moment(fechaCertificadoFumigacion).add(1, 'days').format("YYYY-MM-DD")

                    if (fechaActual >= fechaCertificadoFumigacionVencido) {
                        documentForRevision.certificadoFumigacion.vencidos++
                    } else if (fechaCertificadoFumigacionPorVencer <= fechaActual) {
                        documentForRevision.certificadoFumigacion.porVencer++
                    }
                }

                if ( item.fecha_de_fin_5 ) {
                    fechaCertificadoPozoTierra = moment(item.fecha_de_fin_5).format("YYYY-MM-DD")
                    fechaCertificadoPozoTierraPorVencer = moment(fechaCertificadoPozoTierra).subtract(1, 'month').format("YYYY-MM-DD")
                    fechaCertificadoPozoTierraVencido = moment(fechaCertificadoPozoTierra).add(1, 'days').format("YYYY-MM-DD")

                    if (fechaActual >= fechaCertificadoPozoTierraVencido) {
                        documentForRevision.certificadoPozoTierra.vencidos++
                    } else if (fechaCertificadoPozoTierraPorVencer <= fechaActual) {
                        documentForRevision.certificadoPozoTierra.porVencer++
                    }
                }

                if ( item.fecha_de_fin_6 ) {
                    fechaCertificadoExtintores = moment(item.fecha_de_fin_6).format("YYYY-MM-DD")
                    fechaCertificadoExtintoresPorVencer = moment(fechaCertificadoExtintores).subtract(1, 'month').format("YYYY-MM-DD")
                    fechaCertificadoExtintoresVencido = moment(fechaCertificadoExtintores).add(1, 'days').format("YYYY-MM-DD")

                    if (fechaActual >= fechaCertificadoExtintoresVencido) {
                        documentForRevision.certificadoExtintores.vencidos++
                    } else if (fechaCertificadoExtintoresPorVencer <= fechaActual) {
                        documentForRevision.certificadoExtintores.porVencer++
                    }
                }

                if ( item.fecha_de_fin_7 ) {
                    fechaCertificadoDetectoresHumo = moment(item.fecha_de_fin_7).format("YYYY-MM-DD")
                    fechaCertificadoDetectoresHumoPorVencer = moment(fechaCertificadoDetectoresHumo).subtract(1, 'month').format("YYYY-MM-DD")
                    fechaCertificadoDetectoresHumoVencido = moment(fechaCertificadoDetectoresHumo).add(1, 'days').format("YYYY-MM-DD")

                    if (fechaActual >= fechaCertificadoDetectoresHumoVencido) {
                        documentForRevision.certificadoDetectoresHumo.vencidos++
                    } else if (fechaCertificadoDetectoresHumoPorVencer <= fechaActual) {
                        documentForRevision.certificadoDetectoresHumo.porVencer++
                    }
                }

                if ( item.fecha_de_fin_8 ) {
                    fechaCertificadoLucesEmergencia = moment(item.fecha_de_fin_8).format("YYYY-MM-DD")
                    fechaCertificadoLucesEmergenciaPorVencer = moment(fechaCertificadoLucesEmergencia).subtract(1, 'month').format("YYYY-MM-DD")
                    fechaCertificadoLucesEmergenciaVencido = moment(fechaCertificadoLucesEmergencia).add(1, 'days').format("YYYY-MM-DD")

                    if (fechaActual >= fechaCertificadoLucesEmergenciaVencido) {
                        documentForRevision.certificadoLucesEmergencia.vencidos++
                    } else if (fechaCertificadoLucesEmergenciaPorVencer <= fechaActual) {
                        documentForRevision.certificadoLucesEmergencia.porVencer++
                    }
                }

            }

            let keys = Object.keys(documentForRevision)

            keys.forEach(itemKey => {

                let itemName = documentForRevision[itemKey].name;
                let vencidos = documentForRevision[itemKey].vencidos;
                let por_vencer = documentForRevision[itemKey].porVencer;

                let reallyDivParent = document.createElement('div')
                reallyDivParent.classList.add('grid-row')

                let divParent = document.createElement('div')
                divParent.classList.add('data-row', 'row')

                let divChildrenOne = document.createElement('div')
                divChildrenOne.classList.add('row-index', 'sortable-handle', 'col', 'col-xs-6','head2');
                let spanOne = document.createElement('span')
                spanOne.classList.add('text-center', 'font-weight-bold', 'mt-2');
                spanOne.innerHTML = itemName
                spanOne.style.display = 'block'

                let divChildrenFive = document.createElement('div')
                divChildrenFive.classList.add('col', 'grid-static-col', 'col-xs-3', 'text-center','head2');
                divChildrenFive.style.padding = '1px'
                let buttonOne = document.createElement('button')
                buttonOne.classList.add('field-area', 'static-area', 'ellipsis', 'btn', 'btn-primary', 'btn-xl', 'primary-action','mt-2');
                buttonOne.innerText = por_vencer

                buttonOne.onclick = function(event) {
                    event.stopPropagation(); // Detiene la propagación del evento para evitar que otros manejadores lo intercepten
                    window.open(documentForRevision[itemKey].path_por_vencer, '_blank'); // Abre el enlace en una nueva pestaña
                };

                let divChildrenSix = document.createElement('div')
                divChildrenSix.classList.add('col', 'grid-static-col', 'col-xs-3', 'text-center','head2');
                divChildrenSix.style.padding = '1px'
                let buttonTwo = document.createElement('button')
                buttonTwo.classList.add('field-area', 'static-area', 'ellipsis', 'btn', 'btn-primary', 'btn-xl', 'primary-action','mt-2');
                buttonTwo.innerText = vencidos
                buttonTwo.onclick = function(event) {
                    event.stopPropagation(); // Detiene la propagación del evento para evitar que otros manejadores lo intercepten
                    window.open(documentForRevision[itemKey].parth_vencido, '_blank'); // Abre el enlace en una nueva pestaña
                };


                divChildrenOne.appendChild(spanOne)
                divChildrenFive.appendChild(buttonOne)
                divChildrenSix.appendChild(buttonTwo)

                divParent.appendChild(divChildrenOne)
                divParent.appendChild(divChildrenFive)
                divParent.appendChild(divChildrenSix)

                reallyDivParent.appendChild(divParent)

                table_data_licencias.appendChild(reallyDivParent)

            });
            $('#loading_spinner').hide();
            $('#table_data_licencias').show();
            $('.head2').css({'height': '55px'});
            $('.btn-xl').css({'width': '90px'});

        },1000)
    }
    async function alerta_contrato_alquiler() {
        let messageAlert =`
                <div class="section-head text-center mx-4 mt-3 text-uppercase font-weight-bold">
                    ALERTA CONTRATO DE ALQUILER
                </div>
				<div class="mt-4 mb-4 frappe-control form-group mx-4" data-fieldtype="Table" data-fieldname="table_licencias" title="table_licencias">
    				<div class="form-grid">
						<div class="grid-heading-row">
							<div class="grid-row">
							  <div class="data-row row">
								<div class="head col grid-static-col col-xs-3 mt-3" data-fieldname="tipo_de_servicio" data-fieldtype="Link" title="Tipo de Servicio">
								  <div class="field-area static-area ellipsis text-uppercase text-center font-weight-bold">Solicitud de Contratos</div>
								</div>
								<div class="head col grid-static-col col-xs-3 mt-3" data-fieldname="tipo_de_servicio" data-fieldtype="Link" title="Tipo de Servicio">
								  <div class="field-area static-area ellipsis text-uppercase text-center font-weight-bold">Sucursal</div>
								</div>
								<div class="head col grid-static-col col-xs-3 mt-3" data-fieldname="tipo_de_servicio" data-fieldtype="Link" title="Tipo de Servicio">
								  <div class="field-area static-area ellipsis text-uppercase text-center font-weight-bold">Estado</div>
								</div>
								<div class="head col grid-static-col col-xs-3 mt-3" data-fieldname="tipo_de_servicio" data-fieldtype="Link" title="Tipo de Servicio">
								  <div class="field-area static-area ellipsis text-uppercase text-center font-weight-bold">Detalle</div>
								</div>
							  </div>
							</div>
							<div class="grid-body">
                                <div class="rows">
                                    <div class="spinner-border text-primary" role="status" id="loading_spinner_alquiler" style="margin-left: 405px;margin-top: 10px; margin-bottom: 5px">
                                      <span class="visually-hidden"></span>
                                    </div>
                                    <div id="table_data_alquiler" style="display: none">
                                    </div>
                                    <div id="table_not_data_alquiler" class="grid-empty text-center" style="display: none">
                                        <img src="https://capacitacion.shalom.com.pe/assets/frappe/images/ui-states/grid-empty-state.svg" alt="Grid Empty State" class="grid-empty-illustration">
                                        No hay datos
                                    </div>
                                </div>
				  	        </div>
						  </div>
    				</div>
  				</div>`

        frappe.msgprint({
            title: __('Notification'),
            message: __(messageAlert)
        });

        setTimeout( async () => {
            const getDocumentsContratos = await frappe.db.get_list('Solicitud de Contratos Alquiler', {
                'filters': {
                    'estado_del_documento': 'Habilitado',
                },
                'limit': 'None',
                'fields': ['name', 'sucursal', 'estado_del_documento', 'fecha_de_fin_contrato']
            });

            let solicitudContratos = []
            let fechaActual = moment().format("YYYY-MM-DD")
            let fechaSubtractOneMonth = moment(fechaActual).add(1, 'month').format("YYYY-MM-DD")

            let fechaContratoAlquiler = ''
            let fechaContratoAlquilerPorvencer = ''
            let fechaContratoAlquilerVencido = ''
            let table_data_alquiler = document.getElementById('table_data_alquiler')

            for ( let item of getDocumentsContratos ) {
                fechaContratoAlquiler = moment(item.fecha_de_fin_contrato).format("YYYY-MM-DD")
                fechaContratoAlquilerPorvencer = moment(fechaContratoAlquiler).subtract(3, 'days').format("YYYY-MM-DD")
                fechaContratoAlquilerVencido = moment(fechaContratoAlquiler).add(1, 'days').format("YYYY-MM-DD")
                if (fechaActual >= fechaContratoAlquilerVencido) {
                    solicitudContratos.push({
                        name: item.name,
                        sucursal: item.sucursal,
                        estado: 'Vencido',
                    })
                } else if (fechaContratoAlquilerPorvencer <= fechaActual) {
                    solicitudContratos.push({
                        name: item.name,
                        sucursal: item.sucursal,
                        estado: 'Por vencer',
                    })
                }
            }

            if ( solicitudContratos.length === 0 ) {
                return false
            }

            for ( let itemTwo of solicitudContratos ) {
                let reallyDivParent = document.createElement('div')
                reallyDivParent.classList.add('grid-row')

                let divParent = document.createElement('div')
                divParent.classList.add('data-row', 'row')

                let divChildrenOne = document.createElement('div')
                divChildrenOne.classList.add('row-index', 'sortable-handle', 'col', 'col-xs-3','head2');
                let spanOne = document.createElement('span')
                spanOne.classList.add('text-center', 'font-weight-bold', 'mt-2');
                spanOne.innerHTML = itemTwo.name
                spanOne.style.display = 'block'

                let divChildrenTwo = document.createElement('div')
                divChildrenTwo.classList.add('row-index', 'sortable-handle', 'col', 'col-xs-3','head2');
                let spanTwo = document.createElement('span')
                spanTwo.classList.add('text-center', 'font-weight-bold', 'mt-2');
                spanTwo.innerHTML = itemTwo.sucursal
                spanTwo.style.display = 'block'

                let divChildrenThree = document.createElement('div')
                divChildrenThree.classList.add('row-index', 'sortable-handle', 'col', 'col-xs-3','head2');
                let spanThree = document.createElement('span')
                spanThree.classList.add('text-center', 'font-weight-bold', 'mt-2');
                spanThree.innerHTML = itemTwo.estado
                spanThree.style.display = 'block'

                let divChildrenSix = document.createElement('div')
                divChildrenSix.classList.add('col', 'grid-static-col', 'col-xs-3', 'text-center','head2');
                divChildrenSix.style.padding = '1px'
                let buttonTwo = document.createElement('button')
                buttonTwo.classList.add('field-area', 'static-area', 'ellipsis', 'btn', 'btn-primary', 'btn-xl', 'primary-action','mt-2');
                buttonTwo.innerText = "IR"
                buttonTwo.onclick = function(event) {
                    event.stopPropagation(); // Detiene la propagación del evento para evitar que otros manejadores lo intercepten
                    window.open("https://capacitacion.shalom.com.pe/app/solicitud-de-contratos-alquiler/"+itemTwo.name, '_blank'); // Abre el enlace en una nueva pestaña
                };


                divChildrenOne.appendChild(spanOne)
                divChildrenTwo.appendChild(spanTwo)
                divChildrenThree.appendChild(spanThree)
                divChildrenSix.appendChild(buttonTwo)

                divParent.appendChild(divChildrenOne)
                divParent.appendChild(divChildrenTwo)
                divParent.appendChild(divChildrenThree)
                divParent.appendChild(divChildrenSix)

                reallyDivParent.appendChild(divParent)

                table_data_alquiler.appendChild(reallyDivParent)

            }
            $('#loading_spinner_alquiler').hide();
            $('#table_data_alquiler').show();
            $('.head2').css({'height': '55px'});
            $('.btn-xl').css({'width': '90px'});
        },1000)
    }
    async function page_loaded() {
        let rolesUser = frappe.user_roles;
        let userLogin = frappe.user.name;
        if ( (frappe.user.has_role('Supervisor Nacional') || frappe.user.name == "72388040@shalomcontrol.com" || frappe.user.name == "72733888@shalomcontrol.com") &&
            ($('div[data-page-name="HR"]').length > 0 || $('div[data-page-name="Selling"]').length > 0 || $('div[data-page-name="Buying"]').length > 0)
            && !frappe.user.has_role('System Manager') ) {
            await alerta_licencia_certificado()
            if (frappe.user.name !== "72388040@shalomcontrol.com" && frappe.user.name !== "72733888@shalomcontrol.com") {
                await alerta_contrato_alquiler()
            }
        }
        frappe.router.on('change', async () => {
            if ( (frappe.user.has_role('Supervisor Nacional') || frappe.user.name == "72388040@shalomcontrol.com" || frappe.user.name == "72733888@shalomcontrol.com") &&
                ($('div[data-page-name="HR"]').length > 0 || $('div[data-page-name="Selling"]').length > 0 || $('div[data-page-name="Buying"]').length > 0)
                && !frappe.user.has_role('System Manager') ) {
                await alerta_licencia_certificado()
                if (frappe.user.name !== "72388040@shalomcontrol.com" && frappe.user.name !== "72733888@shalomcontrol.com") {
                    await alerta_contrato_alquiler()
                }
            }
        });
    }
    //Modules view
    $(window).on('load', async () => {
        await page_loaded();
    });
})();
