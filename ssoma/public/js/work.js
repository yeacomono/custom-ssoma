(async () => {
    async function cambiar_referencia () {
        let roles = frappe.user_roles
        if ($('div[data-page-name="Modulo"]').length > 0 ) {
            if ( roles.includes('Usuario SSOMA') ) {
                var enlaces = $('div[data-widget-name="2cfe118a60"] a');
                var enlacesFiltrados = enlaces.each(function() {
                    let label_item = $(this).text().trim()
                    if ( label_item === "Diagnósticos Lima" ) {
                        $(this).attr('href', 'https://capacitacion.shalom.com.pe/app/matriz-de-condiciones?zonas_nacional=%5B%22in%22%2C%22LIMA%20SUR-ESTE%2CLIMA%20NORTE%20OESTE%22%5D');
                    } else if ( label_item === "Diagnósticos Provincia" ) {
                        $(this).attr('href', 'https://capacitacion.shalom.com.pe/app/matriz-de-condiciones?zonas_nacional=%5B%22in%22%2C%22SUR-AREQUIPA%2CSUR%202%2CSUR-SIERRA%2CNOR-LIBERTAD%2CSUR%2CNORTE%202%2CNOR-ORIENTE%2CNOR-LAMBAYEQUE%2CCENTRO-SELVA%20CENTRAL%2CNORTE%22%5D');
                    } else if ( label_item === "Diagnósticos Concesionarios" ) {
                        $(this).attr('href', 'https://capacitacion.shalom.com.pe/app/matriz-de-condiciones?zonas_nacional=%5B%22is%22%2C%22not%20set%22%5D');
                    }
                });
            } else if ( roles.includes('Administador de agencia') ) {
                var enlaces = $('div[data-widget-name="2cfe118a60"] a');
                var enlacesFiltrados = enlaces.each(function() {
                    let label_item = $(this).text().trim()
                    if ( label_item === "Diagnósticos Lima" ) {
                        $(this).attr('href', 'https://capacitacion.shalom.com.pe/app/matriz-de-condiciones?zonas_nacional=%5B%22is%22%2C%22set%22%5D');
                    } else if ( label_item === "Diagnósticos Provincia" ) {
                        $(this).attr('href', 'https://capacitacion.shalom.com.pe/app/matriz-de-condiciones?zonas_nacional=%5B%22is%22%2C%22set%22%5D');
                    } else if ( label_item === "Diagnósticos Concesionarios" ) {
                        $(this).attr('href', 'https://capacitacion.shalom.com.pe/app/matriz-de-condiciones?zonas_nacional=%5B%22is%22%2C%22set%22%5D');
                    }
                });
            }
        }
        if (roles.includes('Administrador de agencia') ) {

            let verificar_lima_provincia = await $.ajax({
                type:"POST",
                url:'https://recursoshumanos.shalom.com.pe/web/job-applicant/verify-lima-or-province',
                dataType:"JSON",
                data: {
                    "user": frappe.user.name
                }
            });

            if (!verificar_lima_provincia.status) {
                setTimeout( ()=>{
                    let card_break_lima = $("[data-widget-name='4e74e17f93']")
                    if (card_break_lima.length) {
                        card_break_lima[0].hidden = true;
                    }
                },1500)
            }
        }
    }
    $(window).on('load', page_loaded);
    function page_loaded() {
        frappe.router.on('change', async () => {
            await cambiar_referencia()
        })
        setTimeout( async ()=>{
            await cambiar_referencia()
        },1000)
    }
})();