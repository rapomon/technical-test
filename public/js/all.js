function afterAddClient(_form, json) {
	toastr.success(json.message);
	var $modal = $(_form).closest("div.modal");
	if($modal.length > 0) $modal.modal("hide");
	$("#clientes tbody").append(' \
                <tr data-id="'+json.data.id+'"> \
                    <td class="data-id">'+json.data.id+'</td> \
                    <td class="data-nombre">'+json.data.nombre+'</td> \
                    <td class="data-cif">'+json.data.cif+'</td> \
                    <td class="data-direccion">'+json.data.direccion+'</td> \
                    <td class="data-email">'+json.data.email+'</td> \
                    <td style="white-space: nowrap;"> \
                        <a href="/edit/'+json.data.id+'" class="btn btn-primary" onclick="return showModalDialog(this);">Editar</a> \
                        <a href="/delete/'+json.data.id+'" class="btn btn-danger" onclick="return deleteClient(this);">Eliminar</a> \
                    </td> \
                </tr> \
	');
}

function afterEditClient(_form, json) {
	toastr.success(json.message);
	var $modal = $(_form).closest("div.modal");
	if($modal.length > 0) $modal.modal("hide");
	var $cliente = $("#clientes tr[data-id='"+json.data.id+"']");
	$("td.data-id", $cliente).html(json.data.id);
	$("td.data-nombre", $cliente).html(json.data.nombre);
	$("td.data-cif", $cliente).html(json.data.cif);
	$("td.data-direccion", $cliente).html(json.data.direccion);
	$("td.data-email", $cliente).html(json.data.email);
}

function deleteClient(link){
	if(confirm('Seguro que desea eliminar este cliente?')) {
		callAjaxUrl(link, afterDeleteClient);
	}
	return false;
}

function afterDeleteClient($link, json) {
	toastr.success(json.message);
	$link.closest("tr").remove();
}

function showModalDialog(obj, callback) {

	var href;
	var isModal = false;

	if(typeof(obj) == "string") {
		href = obj;
	} else {
		var $this = $(obj);
		if($this.length == 0) return false;

		href = $this.attr('href');
		if(href == undefined) href = $this.attr('data-href');

		if($this.attr('data-modal') != undefined && $this.attr('data-modal') == "true") {
			isModal = true;
		}
	}

	$.ajax({
		url: href,
		dataType: 'html',
		success: function(html){
			var $modal = $(html).filter("div.modal");
			if($modal.length > 0) {
				$("body").append($modal);
				if(isModal) $modal.modal({ keyboard: false, backdrop: 'static' });
				$modal.on('hidden.bs.modal', function() {
					$(this).removeData("bs.modal").remove();
				});
				$modal.modal("show");
				if(typeof(callback) == 'function') {
					callback(obj);
				}
			} else {
				location.reload();
			}
		},
		error: function(jqXHR, textStatus) {
			toastr.error(textStatus);
		}
	});

	return false;
}

function submitAjaxForm(_form, callbackSuccess, callbackError) {
	var $form = $(_form);
	$.ajax({
		type: $form.attr("method") || "post",
		dataType: 'json',
		url: $form.attr("action"),
		data: $form.serialize(),
		success: function(json) {
			if(json.level == "SUCCESS") {
				if(typeof(callbackSuccess) == 'function') {
					callbackSuccess(_form, json);
				} else {
					toastr.success(json.message);
					var $modal = $(_form).closest("div.modal");
					if($modal.length > 0) $modal.modal("hide");
					setTimeout(function() { location.reload(); }, 1000);
				}
			} else {
				if(typeof(callbackError) == 'function') {
					callbackError(_form, json);
				} else {
					toastr.error(json);
				}
			}
		},
		error: function(jqXHR, textStatus) {
			toastr.error(textStatus);
		}
	});
	return false;
}

function callAjaxUrl(link, callbackSuccess, callbackError) {
	var $link = $(link);
	$.ajax({
		type: "GET",
		dataType: 'json',
		url: $link.attr("href"),
		success: function(json) {
			if(json.level == "SUCCESS") {
				if(typeof(callbackSuccess) == "function") {
					callbackSuccess($link, json);
				} else {
					toastr.success(json.message);
					setTimeout(function() { location.reload(); }, 1000);
				}
			} else {
				if(typeof(callbackError) == "function") {
					callbackError($link, json);
				} else {
					toastr.error(json);
				}
			}
		},
		error: function(jqXHR, textStatus) {
			toastr.error(textStatus);
		}
	});
	return false;
}
