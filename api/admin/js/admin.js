/**
 * Created by sven on 23/09/2016.
 */

$(document).ready(function() {
    var tickets = $('#ticketsOverview').DataTable({
        "pageLength": 12,
        "lengthChange": false,
        "columnDefs": [
            {
                "targets": 1,
                "width": "150px"
            },
            {
                "targets": 3,
                "width": "60px"
            }
        ]
    });
    $('#ticketsOverview tbody tr').on('click', 'td.clickable', function () {
        var row = $(this).parent().data('json');
        var modal = $('#ticketModal');

        modal.find('.ticket_name').text(row.name);
        modal.find("#hidden_value").val(row.key);

        var consumers = "";
        $.each(row.ticketsSold, function(k, v) {
            consumers += "<tr><td>" + (k + 1) + "</td><td>" + v.user_name + "</td><td>" + v.user_email + "</td><td>" + v.unique_key + "</td></tr>"
        });
        modal.find('.consumers-details').html(consumers);

        modal.modal('show');
    });

    $('#ticketsOverview tbody tr td').on('click', '#editTicket', function () {
        var modal = $('#ticketEditModal');
        var row = $(this).parent().parent().data('json');

        console.log(row);

        var d = new Date(row.date);
        var day = ("0" + d.getDate()).slice(-2);
        var month = ("0" + (d.getMonth() + 1)).slice(-2);
        var date = d.getFullYear()+"-"+(month)+"-"+(day) ;

        modal.find("#ticketKey").val(row.key);
        modal.find("#name").val(row.name);
        modal.find("#description").val(row.description);
        modal.find("#amount").val(row.amount);
        modal.find("#date").val(date);
        modal.find("#max_sold").val(row.max_sold);
        modal.find("#background").val(row.background);

        modal.modal('show');
    });

    var orders = $('#orderOverview').DataTable({
        "pageLength": 12,
        "lengthChange": false
    });

    $('#orderOverview tbody').on('click', 'tr', function () {
        var row = $(this).data('json');

        var modal = $('#orderModal');
        modal.find('.order_key').text(row.order_key);
        if (row.order_account_info != null) {
            modal.find('.consumer_name').text(row.order_account_info.consumerName);
            modal.find('.consumer_account').text(row.order_account_info.consumerAccount);
        }
        modal.find('.order_amount').text("€" + row.order_amount.toFixed(2).replace(".", ","));
        modal.find('.order_status').text(row.order_status);
        modal.find('.order_created').text(row.created_at);

        var tickets = "";
        $.each(row.tickets, function(k, v) {
            v.amount = "&euro; " + v.ticket.amount.toFixed(2).replace(".", ",");
            tickets += "<tr><td>#</td><td>" + v.ticket.name + "</td><td>" + v.user_name + "</td><td>" + v.user_email + "</td><td>" +
               v.amount + "</td><td></td></tr>";
        });
        tickets += "<tr><td>#</td><td>Transaction fee</td><td></td><td></td><td>&euro; 0,29</td><td></td></tr>";

        modal.find('.ticket-details').html(tickets);
        modal.modal('show');
    } );
});